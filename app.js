const SCENES = {
  mountains: {
    title: "Mountains",
    blurb: "Sunlit peaks, slow clouds, a bright alpine day.",
  },
  spa: {
    title: "Spa",
    blurb: "Warm water, still deck, gold afternoon light.",
  },
  garden: {
    title: "Garden",
    blurb: "Sunny blooms, a garden path, a clear blue sky.",
  },
  meadow: {
    title: "Meadow",
    blurb: "Lavender rows, a wide sky, late-day color.",
  },
};

const rootA = document.getElementById("viewA");
const rootB = document.getElementById("viewB");
const viewA = new AmbientView(rootA);
const viewB = new AmbientView(rootB);
const gate = document.getElementById("gate");
const enterBtn = document.getElementById("enterBtn");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const muteBtn = document.getElementById("muteBtn");
const volume = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const sceneTitle = document.getElementById("sceneTitle");
const sceneBlurb = document.getElementById("sceneBlurb");
const nowPlaying = document.getElementById("nowPlaying");
const sceneButtons = [...document.querySelectorAll(".scene")];

const sound = new SpaSoundscape();
let activeScene = "mountains";
let front = rootA;
let back = rootB;
let frontView = viewA;
let backView = viewB;
let playing = true;
let idleTimer = 0;
let entered = false;

Object.values(PLATES).forEach((src) => {
  const img = new Image();
  img.src = src;
});

viewA.setScene("mountains");
viewB.setScene("mountains");
viewA.start();
viewB.start();
window.addEventListener("load", () => {
  viewA.resize();
  viewB.resize();
});

function applyScene(name, { fade = true } = {}) {
  activeScene = name;
  const scene = SCENES[name];
  sceneTitle.textContent = scene.title;
  sceneBlurb.textContent = scene.blurb;
  sceneButtons.forEach((button) => {
    const selected = button.dataset.scene === name;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  document.body.dataset.scene = name;
  document.body.style.setProperty(
    "--gold",
    { mountains: "#f0c36a", spa: "#ffb38a", garden: "#7ed38a", meadow: "#d4a0ff" }[name]
  );
  sound.setScene(name);

  if (!fade || frontView.scene === name) {
    frontView.setScene(name);
    front.classList.add("is-front");
    back.classList.remove("is-front");
    updateNowPlaying();
    return;
  }

  backView.setScene(name);
  backView.setPlaying(playing);
  requestAnimationFrame(() => {
    back.classList.add("is-front");
    front.classList.remove("is-front");
    const previousRoot = front;
    const previousView = frontView;
    front = back;
    frontView = backView;
    back = previousRoot;
    backView = previousView;
  });
  updateNowPlaying();
}

function setPlaying(next) {
  playing = next;
  frontView.setPlaying(playing);
  backView.setPlaying(playing);
  document.body.classList.toggle("is-paused", !playing);
  if (playing) {
    if (entered) sound.resume();
    playBtn.setAttribute("aria-label", "Pause");
    playIcon.innerHTML =
      '<rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect>';
  } else {
    if (entered) sound.pause();
    playBtn.setAttribute("aria-label", "Play");
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"></path>';
  }
  updateNowPlaying();
}

function updateNowPlaying() {
  nowPlaying.textContent = entered ? sound.statusText() : "Spa sound ready";
}

function bumpIdle() {
  document.body.classList.remove("is-idle");
  window.clearTimeout(idleTimer);
  if (!entered) return;
  idleTimer = window.setTimeout(() => {
    document.body.classList.add("is-idle");
  }, 4200);
}

async function enter() {
  if (entered) return;
  entered = true;
  await sound.start();
  sound.setVolume(Number(volume.value) / 100);
  sound.setMuted(false);
  setPlaying(true);
  gate.classList.add("is-gone");
  updateNowPlaying();
  bumpIdle();
}

enterBtn.addEventListener("click", enter);

sceneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyScene(button.dataset.scene);
    if (entered && playing) sound.setMuted(false);
  });
});

playBtn.addEventListener("click", () => {
  if (!entered) {
    enter();
    return;
  }
  if (!playing) sound.setMuted(false);
  setPlaying(!playing);
});

muteBtn.addEventListener("click", () => {
  if (!entered) {
    enter();
    return;
  }
  sound.setMuted(!sound.muted);
  muteBtn.textContent = sound.muted ? "Sound off" : "Sound on";
  updateNowPlaying();
});

volume.addEventListener("input", () => {
  sound.setVolume(Number(volume.value) / 100);
  if (sound.volume > 0 && sound.muted) {
    sound.setMuted(false);
    muteBtn.textContent = "Sound on";
  }
  updateNowPlaying();
});

fullscreenBtn.addEventListener("click", async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }
  await document.documentElement.requestFullscreen();
});

document.addEventListener("keydown", (event) => {
  if (event.target.closest("input, textarea")) return;
  const sceneKeys = { 1: "mountains", 2: "spa", 3: "garden", 4: "meadow" };
  if (sceneKeys[event.key]) applyScene(sceneKeys[event.key]);
  if (event.code === "Space") {
    event.preventDefault();
    playBtn.click();
  }
  if (event.key.toLowerCase() === "m") muteBtn.click();
  if (event.key.toLowerCase() === "f") fullscreenBtn.click();
});

["mousemove", "pointerdown", "keydown", "touchstart"].forEach((name) => {
  document.addEventListener(name, bumpIdle, { passive: true });
});

applyScene("mountains", { fade: false });
updateNowPlaying();
