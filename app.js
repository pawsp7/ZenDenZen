const SCENES = {
  mountains: {
    title: "Mountains",
    blurb: "Alpine light, drifting cloud, quiet peaks.",
    clips: [4131, 4366, 4396, 4132, 4283, 4115, 4998],
  },
  spa: {
    title: "Spa",
    blurb: "Candle glow, still water, a warm indoor hush.",
    clips: [3453, 43064, 43076, 1280],
  },
  garden: {
    title: "Garden",
    blurb: "Evening blooms, garden paths, a slow golden hour.",
    clips: [4205, 1168],
  },
  meadow: {
    title: "Meadow",
    blurb: "Open fields, wildflowers, air moving through grass.",
    clips: [41395, 4075, 2854],
  },
};

const mixkitUrl = (id) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;
const mixkitPoster = (id) => `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`;

const videoA = document.getElementById("videoA");
const videoB = document.getElementById("videoB");
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
let clipIndex = 0;
let front = videoA;
let back = videoB;
let playing = true;
let idleTimer = 0;
let entered = false;

function currentClips() {
  return SCENES[activeScene].clips;
}

function nextClipId(fromIndex = clipIndex) {
  const clips = currentClips();
  return clips[(fromIndex + 1) % clips.length];
}

function loadInto(video, id) {
  video.poster = mixkitPoster(id);
  if (video.dataset.clip === String(id) && video.src) return Promise.resolve();
  video.dataset.clip = String(id);
  video.src = mixkitUrl(id);
  video.load();
  return new Promise((resolve, reject) => {
    const ok = () => {
      cleanup();
      resolve();
    };
    const fail = () => {
      cleanup();
      reject(new Error(`clip ${id} failed`));
    };
    const cleanup = () => {
      video.removeEventListener("canplay", ok);
      video.removeEventListener("error", fail);
    };
    video.addEventListener("canplay", ok, { once: true });
    video.addEventListener("error", fail, { once: true });
  });
}

async function showClip(id, { fade = true } = {}) {
  try {
    await loadInto(back, id);
  } catch (err) {
    const clips = currentClips().filter((clip) => clip !== id);
    if (!clips.length) return;
    clipIndex = currentClips().indexOf(clips[0]);
    return showClip(clips[0], { fade });
  }

  back.loop = currentClips().length === 1;
  const playPromise = back.play();
  if (playPromise) playPromise.catch(() => {});

  if (fade) {
    back.classList.add("is-front");
    front.classList.remove("is-front");
  } else {
    back.classList.add("is-front");
    front.classList.remove("is-front");
    front.pause();
  }

  const previous = front;
  front = back;
  back = previous;
  clipIndex = currentClips().indexOf(id);
  window.setTimeout(() => {
    if (back !== front) back.pause();
  }, 1500);
  preloadNext();
}

function preloadNext() {
  const upcoming = nextClipId();
  if (String(upcoming) === back.dataset.clip) return;
  loadInto(back, upcoming).catch(() => {});
}

function applyScene(name, { fade = true } = {}) {
  activeScene = name;
  clipIndex = 0;
  const scene = SCENES[name];
  sceneTitle.textContent = scene.title;
  sceneBlurb.textContent = scene.blurb;
  sceneButtons.forEach((button) => {
    const selected = button.dataset.scene === name;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  document.body.style.setProperty(
    "--gold",
    { mountains: "#c4a574", spa: "#d7c4b0", garden: "#b7c89a", meadow: "#e0d08a" }[name]
  );
  sound.setScene(name);
  showClip(scene.clips[0], { fade });
  updateNowPlaying();
}

function setPlaying(next) {
  playing = next;
  if (playing) {
    front.play().catch(() => {});
    if (entered) sound.resume();
    playBtn.setAttribute("aria-label", "Pause");
    playIcon.innerHTML =
      '<rect x="6" y="5" width="4" height="14" rx="1"></rect><rect x="14" y="5" width="4" height="14" rx="1"></rect>';
  } else {
    front.pause();
    back.pause();
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

function onClipEnded(event) {
  if (!playing || event.target !== front) return;
  showClip(nextClipId());
}

videoA.addEventListener("ended", onClipEnded);
videoB.addEventListener("ended", onClipEnded);

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
front.muted = true;
front.play().catch(() => {});
updateNowPlaying();
