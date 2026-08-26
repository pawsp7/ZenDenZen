const mixkit = (id) => ({
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`,
});

const CLIPS = {
  mountains: { ...mixkit(35085), rate: 0.34 },
  spa: { ...mixkit(27626), rate: 0.38 },
  garden: { ...mixkit(44970), rate: 0.36 },
  meadow: { ...mixkit(16018), rate: 0.34 },
};

class AmbientView {
  constructor(root) {
    this.root = root;
    this.still = root.querySelector(".still");
    this.video = root.querySelector("video.plate");
    this.canvas = root.querySelector(".atmosphere");
    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.scene = "mountains";
    this.rate = CLIPS.mountains.rate;
    this.running = true;
    this.speed = 0.18;
    this.elapsed = 0;
    this.last = performance.now();
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.reduced) this.speed = 0.05;
    this.motes = Array.from({ length: 18 }, (_, i) => ({
      x: (i * 0.137 + 0.05) % 1,
      y: (i * 0.211 + 0.08) % 1,
      r: 0.45 + (i % 4) * 0.22,
      v: 0.002 + (i % 5) * 0.0008,
    }));
    this.raf = 0;

    this.video.muted = true;
    this.video.defaultMuted = true;
    this.video.loop = true;
    this.video.playsInline = true;
    this.video.setAttribute("playsinline", "");
    this.video.setAttribute("webkit-playsinline", "");
    this.video.preload = "auto";

    this.video.addEventListener("loadedmetadata", () => this.applyRate());
    this.video.addEventListener("canplay", () => {
      this.applyRate();
      if (this.running && !this.reduced) {
        const play = this.video.play();
        if (play) play.catch(() => {});
      }
    });
    this.video.addEventListener("playing", () => {
      this.applyRate();
      this.root.classList.add("has-video");
    });
    this.video.addEventListener("error", () => {
      this.root.classList.remove("has-video");
    });

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.root.clientWidth || window.innerWidth;
    const h = this.root.clientHeight || window.innerHeight;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w;
    this.h = h;
  }

  applyRate() {
    const rate = this.reduced ? 0 : this.rate;
    try {
      this.video.playbackRate = rate;
    } catch (_err) {
      /* some browsers reject very low rates */
    }
  }

  setScene(name) {
    const clip = CLIPS[name];
    if (!clip) return;
    this.scene = name;
    this.rate = clip.rate;
    if (this.still.getAttribute("src") !== clip.poster) {
      this.still.src = clip.poster;
    }
    if (this.video.dataset.clip !== name) {
      this.root.classList.remove("has-video");
      this.video.dataset.clip = name;
      this.video.poster = clip.poster;
      this.video.src = clip.src;
      this.video.load();
    }
    this.applyRate();
    if (this.running && !this.reduced) {
      const play = this.video.play();
      if (play) play.catch(() => {});
    }
  }

  setPlaying(playing) {
    this.running = playing;
    this.root.classList.toggle("is-paused", !playing);
    if (playing && !this.reduced) {
      this.last = performance.now();
      this.applyRate();
      const play = this.video.play();
      if (play) play.catch(() => {});
    } else {
      this.video.pause();
    }
  }

  start() {
    const loop = (now) => {
      if (this.running) this.elapsed += (now - this.last) * this.speed;
      this.last = now;
      this.draw(this.elapsed / 1000);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  draw(t) {
    const { ctx, w, h, scene } = this;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);

    this.motes.forEach((m, i) => {
      const x = ((m.x + t * m.v) % 1) * w;
      const y = ((m.y + Math.sin(t * 0.15 + i) * 0.02 + 1) % 1) * h;
      const alpha = scene === "spa" ? 0.14 : 0.08;
      ctx.fillStyle = `rgba(255,255,255,${alpha + Math.sin(t + i) * 0.04})`;
      ctx.beginPath();
      ctx.arc(x, y, m.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

window.AmbientView = AmbientView;
window.CLIPS = CLIPS;
