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
const variantRow = document.getElementById("variantRow");
const sceneButtons = [...document.querySelectorAll(".scene")];

const sound = new SpaSoundscape();
let activeScene = "mountains";
let variantIndex = 0;
const lastVariant = { mountains: 0, spa: 0, garden: 0, meadow: 0 };
let front = rootA;
let back = rootB;
let frontView = viewA;
let backView = viewB;
let playing = true;
let idleTimer = 0;
let entered = false;

try {
  const saved = JSON.parse(localStorage.getItem("zdz-variants") || "{}");
  Object.keys(lastVariant).forEach((key) => {
    if (Number.isInteger(saved[key])) lastVariant[key] = saved[key];
  });
} catch (_err) {
  /* ignore */
}

Object.values(SCENES).forEach((scene) => {
  scene.options.forEach((option) => {
    const img = new Image();
    img.src = option.plate;
  });
});

viewA.setScene("mountains", 0);
viewB.setScene("mountains", 0);
viewA.start();
viewB.start();
window.addEventListener("load", () => {
  viewA.resize();
  viewB.resize();
});

function saveVariants() {
  try {
    localStorage.setItem("zdz-variants", JSON.stringify(lastVariant));
  } catch (_err) {
    /* ignore */
  }
}

function renderVariants() {
  const options = SCENES[activeScene].options;
  variantRow.replaceChildren(
    ...options.map((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "variant" + (index === variantIndex ? " is-active" : "");
      button.dataset.index = String(index);
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", String(index === variantIndex));
      button.textContent = option.name;
      button.addEventListener("click", () => applyView(activeScene, index));
      return button;
    })
  );
}

function applyView(name, nextIndex, { fade = true } = {}) {
  const options = SCENES[name].options;
  const index = ((nextIndex % options.length) + options.length) % options.length;
  const option = options[index];
  activeScene = name;
  variantIndex = index;
  lastVariant[name] = index;
  saveVariants();

  sceneTitle.textContent = SCENES[name].title;
  sceneBlurb.textContent = option.blurb;
  sceneButtons.forEach((button) => {
    const selected = button.dataset.scene === name;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  document.body.dataset.scene = name;
  document.body.dataset.mood = option.mood;
  document.body.style.setProperty("--gold", SCENES[name].accent);
  sound.setScene(name);
  renderVariants();

  const alreadyShowing =
    frontView.scene === name &&
    frontView.optionIndex === index &&
    front.classList.contains("is-front");
  if (!fade || alreadyShowing) {
    frontView.setScene(name, index);
    front.classList.add("is-front");
    back.classList.remove("is-front");
    updateNowPlaying();
    return;
  }

  backView.setScene(name, index);
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
    applyView(button.dataset.scene, lastVariant[button.dataset.scene] ?? 0);
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
  if (sceneKeys[event.key]) applyView(sceneKeys[event.key], lastVariant[sceneKeys[event.key]] ?? 0);
  const variantKeys = { q: 0, w: 1, e: 2 };
  if (variantKeys[event.key.toLowerCase()] !== undefined) {
    applyView(activeScene, variantKeys[event.key.toLowerCase()]);
  }
  if (event.key === "[" || event.key === "]") {
    applyView(activeScene, variantIndex + (event.key === "]" ? 1 : -1));
  }
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

applyView("mountains", lastVariant.mountains ?? 0, { fade: false });
updateNowPlaying();
