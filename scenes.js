const PLATES = {
  mountains:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  spa:
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80",
  garden:
    "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=1920",
  meadow:
    "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1920",
};

class AmbientView {
  constructor(root) {
    this.root = root;
    this.plate = root.querySelector(".plate");
    this.canvas = root.querySelector(".atmosphere");
    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.scene = "mountains";
    this.running = true;
    this.speed = 0.18;
    this.elapsed = 0;
    this.last = performance.now();
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.reduced) this.speed = 0.05;
    this.motes = Array.from({ length: 28 }, (_, i) => ({
      x: (i * 0.137 + 0.05) % 1,
      y: (i * 0.211 + 0.08) % 1,
      r: 0.6 + (i % 4) * 0.35,
      v: 0.003 + (i % 5) * 0.0012,
    }));
    this.raf = 0;
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

  setScene(name) {
    this.scene = name;
    if (this.plate.getAttribute("src") !== PLATES[name]) {
      this.plate.src = PLATES[name];
    }
  }

  setPlaying(playing) {
    this.running = playing;
    this.root.classList.toggle("is-paused", !playing);
    if (playing) this.last = performance.now();
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
      const alpha = scene === "spa" ? 0.28 : 0.16;
      ctx.fillStyle = `rgba(255,255,255,${alpha + Math.sin(t + i) * 0.08})`;
      ctx.beginPath();
      ctx.arc(x, y, m.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (scene === "spa") {
      ctx.fillStyle = "rgba(180, 255, 250, 0.05)";
      for (let i = 0; i < 6; i += 1) {
        const y = h * (0.42 + i * 0.08) + Math.sin(t * 0.4 + i) * 6;
        ctx.beginPath();
        ctx.ellipse(w * 0.5, y, w * 0.48, 14, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

window.AmbientView = AmbientView;
window.PLATES = PLATES;
