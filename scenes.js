class AmbientView {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.scene = "mountains";
    this.running = true;
    this.speed = 0.16;
    this.elapsed = 0;
    this.last = performance.now();
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.reduced) this.speed = 0.04;
    this.clouds = this._seeds(9).map((s, i) => ({
      x: s,
      y: 0.08 + ((i * 17) % 28) / 100,
      s: 0.45 + (i % 5) * 0.12,
      v: 0.004 + (i % 4) * 0.0015,
    }));
    this.petals = this._seeds(22).map((s, i) => ({
      x: s,
      y: ((i * 13) % 100) / 100,
      r: 4 + (i % 5),
      spin: i,
      hue: i % 3,
    }));
    this.sparkles = this._seeds(18).map((s, i) => ({
      x: s,
      y: 0.55 + ((i * 11) % 30) / 100,
      p: i * 0.4,
    }));
    this.raf = 0;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  _seeds(count) {
    return Array.from({ length: count }, (_, i) => ((i * 0.173 + 0.07) % 1));
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { canvas } = this;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w;
    this.h = h;
  }

  setScene(name) {
    this.scene = name;
  }

  setPlaying(playing) {
    this.running = playing;
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
    if (scene === "mountains") this._mountains(ctx, w, h, t);
    else if (scene === "spa") this._spa(ctx, w, h, t);
    else if (scene === "garden") this._garden(ctx, w, h, t);
    else this._meadow(ctx, w, h, t);
  }

  _sky(ctx, w, h, top, mid, bottom) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, top);
    g.addColorStop(0.45, mid);
    g.addColorStop(1, bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  _sun(ctx, x, y, r, t) {
    const pulse = 1 + Math.sin(t * 0.35) * 0.04;
    const glow = ctx.createRadialGradient(x, y, r * 0.15, x, y, r * 2.4 * pulse);
    glow.addColorStop(0, "rgba(255, 250, 180, 1)");
    glow.addColorStop(0.18, "rgba(255, 220, 90, 0.95)");
    glow.addColorStop(0.42, "rgba(255, 180, 80, 0.28)");
    glow.addColorStop(1, "rgba(255, 180, 80, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.4 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff7b0";
    ctx.beginPath();
    ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  _cloud(ctx, x, y, s, alpha = 0.92) {
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.ellipse(x, y, 58 * s, 22 * s, 0, 0, Math.PI * 2);
    ctx.ellipse(x - 34 * s, y + 4 * s, 28 * s, 16 * s, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 36 * s, y + 6 * s, 32 * s, 17 * s, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 8 * s, y - 14 * s, 26 * s, 18 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  _driftClouds(ctx, w, h, t, yScale = 1) {
    this.clouds.forEach((c, i) => {
      const x = ((c.x + t * c.v) % 1.35) * w - 0.18 * w;
      const y = (c.y + Math.sin(t * 0.12 + i) * 0.012) * h * yScale;
      this._cloud(ctx, x, y, c.s * (w / 900), 0.78 + (i % 3) * 0.06);
    });
  }

  _range(ctx, w, h, pts, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, pts[0][1] * h);
    pts.forEach(([x, y], i) => {
      const nx = pts[Math.min(i + 1, pts.length - 1)];
      const cx = (x + nx[0]) / 2;
      const cy = (y + nx[1]) / 2;
      ctx.quadraticCurveTo(x * w, y * h, cx * w, cy * h);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  _pines(ctx, w, h, t, groundY) {
    for (let i = 0; i < 14; i += 1) {
      const x = ((i * 0.083 + 0.02) % 1) * w;
      const sway = Math.sin(t * 0.4 + i) * 3;
      const tall = (0.12 + (i % 4) * 0.03) * h;
      ctx.fillStyle = i % 2 ? "#2fbf6a" : "#46d07c";
      ctx.beginPath();
      ctx.moveTo(x + sway, groundY - tall);
      ctx.lineTo(x - 16 - (i % 3) * 4, groundY);
      ctx.lineTo(x + 16 + (i % 3) * 4, groundY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#c47a3c";
      ctx.fillRect(x - 3, groundY - 8, 6, 10);
    }
  }

  _mountains(ctx, w, h, t) {
    this._sky(ctx, w, h, "#4db8ff", "#9fe4ff", "#ffe7a8");
    this._sun(ctx, w * 0.78, h * 0.2, h * 0.12, t);
    this._driftClouds(ctx, w, h, t, 0.55);
    this._range(ctx, w, h, [[0, 0.48], [0.18, 0.32], [0.32, 0.4], [0.5, 0.22], [0.68, 0.36], [0.84, 0.26], [1, 0.42]], "#f7fbff");
    this._range(ctx, w, h, [[0, 0.56], [0.16, 0.44], [0.34, 0.52], [0.52, 0.38], [0.7, 0.5], [0.88, 0.4], [1, 0.54]], "#c9ecff");
    this._range(ctx, w, h, [[0, 0.64], [0.22, 0.54], [0.4, 0.6], [0.6, 0.52], [0.8, 0.59], [1, 0.56]], "#8fe08a");
    ctx.fillStyle = "#b6f08f";
    ctx.fillRect(0, h * 0.62, w, h * 0.38);
    this._pines(ctx, w, h, t, h * 0.64);
    this._wildflowers(ctx, w, h, t, 0.66, 18, ["#ffd84a", "#fff6d8", "#ff8fab"]);
  }

  _spa(ctx, w, h, t) {
    this._sky(ctx, w, h, "#fff3d6", "#ffd8b8", "#ffc3a8");
    const sunX = w * 0.5;
    const sunY = h * 0.18;
    this._sun(ctx, sunX, sunY, h * 0.14, t);
    const waterTop = h * 0.36;
    const water = ctx.createLinearGradient(0, waterTop, 0, h);
    water.addColorStop(0, "#b9fff6");
    water.addColorStop(0.45, "#62e4de");
    water.addColorStop(1, "#37c5d8");
    ctx.fillStyle = water;
    ctx.fillRect(0, waterTop, w, h - waterTop);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let i = 0; i < 8; i += 1) {
      const y = waterTop + 18 + i * 28 + Math.sin(t * 0.5 + i) * 6;
      ctx.beginPath();
      ctx.ellipse(w * 0.5 + Math.sin(t * 0.2 + i) * 30, y, w * 0.42, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    this.sparkles.forEach((s, i) => {
      const x = ((s.x + t * 0.01) % 1) * w;
      const y = waterTop + 20 + ((s.y + Math.sin(t * 0.3 + i) * 0.02) % 0.5) * (h - waterTop);
      ctx.fillStyle = `rgba(255,255,255,${0.45 + Math.sin(t + s.p) * 0.35})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    for (let i = 0; i < 5; i += 1) {
      const x = w * (0.18 + i * 0.16);
      const bob = Math.sin(t * 0.45 + i) * 8;
      this._lotus(ctx, x, waterTop + 26 + bob, 16 + (i % 3) * 3, i);
    }
    for (let i = 0; i < 7; i += 1) {
      const x = w * (0.12 + i * 0.12);
      const y = waterTop - 8 + Math.sin(t * 0.3 + i) * 4;
      const glow = ctx.createRadialGradient(x, y, 2, x, y, 28);
      glow.addColorStop(0, "rgba(255, 236, 150, 0.95)");
      glow.addColorStop(0.4, "rgba(255, 180, 80, 0.35)");
      glow.addColorStop(1, "rgba(255, 180, 80, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 6; i += 1) {
      const x = ((0.1 * i + t * 0.015) % 1) * w;
      const y = waterTop - 40 - ((t * 8 + i * 30) % 90);
      ctx.beginPath();
      ctx.ellipse(x, y, 18, 28, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _lotus(ctx, x, y, r, i) {
    const colors = ["#ff8fb8", "#ffb3d0", "#ffd0e6"];
    ctx.save();
    ctx.translate(x, y);
    for (let p = 0; p < 8; p += 1) {
      ctx.fillStyle = colors[(p + i) % colors.length];
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.55, r * 0.28, r * 0.7, (p * Math.PI) / 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ffe566";
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _flower(ctx, x, y, r, color, t, i) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 0.5 + i) * 0.12);
    for (let p = 0; p < 6; p += 1) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.55, r * 0.28, r * 0.62, (p * Math.PI) / 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ffe566";
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _wildflowers(ctx, w, h, t, fromY, count, colors) {
    for (let i = 0; i < count; i += 1) {
      const x = ((i * 0.047 + 0.03) % 1) * w;
      const y = h * (fromY + ((i * 17) % 12) / 100);
      const sway = Math.sin(t * 0.55 + i) * 4;
      ctx.strokeStyle = "#3bb85f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 16);
      ctx.lineTo(x + sway, y);
      ctx.stroke();
      this._flower(ctx, x + sway, y, 7 + (i % 4), colors[i % colors.length], t, i);
    }
  }

  _butterfly(ctx, x, y, t, i) {
    const flap = 0.6 + Math.sin(t * 2.2 + i) * 0.35;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = i % 2 ? "#ff9f43" : "#ff6fa1";
    ctx.beginPath();
    ctx.ellipse(-11, 0, 12 * flap, 8, -0.4, 0, Math.PI * 2);
    ctx.ellipse(11, 0, 12 * flap, 8, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4a3b2f";
    ctx.fillRect(-1, -6, 2, 12);
    ctx.restore();
  }

  _garden(ctx, w, h, t) {
    this._sky(ctx, w, h, "#62c4ff", "#b8ecff", "#fff1b0");
    this._sun(ctx, w * 0.18, h * 0.16, h * 0.11, t);
    this._driftClouds(ctx, w, h, t, 0.42);
    ctx.fillStyle = "#7ee08a";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.42);
    ctx.quadraticCurveTo(w * 0.35, h * 0.36, w, h * 0.44);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
    ctx.fillStyle = "#f6d58a";
    ctx.beginPath();
    ctx.moveTo(w * 0.36, h);
    ctx.quadraticCurveTo(w * 0.5, h * 0.46, w * 0.66, h);
    ctx.fill();
    ctx.fillStyle = "#4eca70";
    ctx.fillRect(0, h * 0.52, w * 0.3, h * 0.48);
    ctx.fillRect(w * 0.72, h * 0.5, w * 0.28, h * 0.5);
    const blooms = ["#ff6fa1", "#ff9ec8", "#ffb347", "#ff7a59", "#c9f06a"];
    for (let i = 0; i < 16; i += 1) {
      const left = i < 8;
      const x = (left ? 0.04 : 0.78) * w + (i % 8) * w * 0.03;
      const y = h * (0.46 + (i % 5) * 0.05);
      this._flower(ctx, x, y, 11 + (i % 3) * 2, blooms[i % blooms.length], t, i);
    }
    this.petals.forEach((p, i) => {
      const x = ((p.x + t * 0.012) % 1) * w;
      const y = ((p.y + t * 0.018) % 1) * h * 0.7;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(t * 0.3 + p.spin);
      ctx.fillStyle = ["#ff8fb8", "#ffd1e8", "#ffe08a"][p.hue];
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    for (let i = 0; i < 3; i += 1) {
      const x = w * (0.25 + i * 0.22) + Math.sin(t * 0.25 + i) * 40;
      const y = h * (0.32 + Math.sin(t * 0.35 + i * 2) * 0.06);
      this._butterfly(ctx, x, y, t, i);
    }
  }

  _meadow(ctx, w, h, t) {
    this._sky(ctx, w, h, "#3eb6ff", "#9adaff", "#ffe9a6");
    this._sun(ctx, w * 0.82, h * 0.16, h * 0.12, t);
    this._driftClouds(ctx, w, h, t, 0.5);
    this._range(ctx, w, h, [[0, 0.48], [0.25, 0.4], [0.5, 0.46], [0.75, 0.38], [1, 0.44]], "#9aea78");
    this._range(ctx, w, h, [[0, 0.56], [0.2, 0.5], [0.45, 0.54], [0.7, 0.48], [1, 0.54]], "#b6f56a");
    ctx.fillStyle = "#d0ff86";
    ctx.fillRect(0, h * 0.56, w, h * 0.44);
    for (let i = 0; i < 40; i += 1) {
      const x = ((i * 0.041) % 1) * w;
      const base = h * 0.6 + (i % 7) * 8;
      const sway = Math.sin(t * 0.6 + i * 0.4) * 6;
      ctx.strokeStyle = i % 2 ? "#5ed66a" : "#7ae56f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, base + 28);
      ctx.quadraticCurveTo(x + sway, base + 12, x + sway * 1.4, base);
      ctx.stroke();
    }
    this._wildflowers(ctx, w, h, t, 0.58, 28, ["#ffe14a", "#ffffff", "#ff8fab", "#ffb347"]);
    for (let i = 0; i < 3; i += 1) {
      const x = w * (0.2 + i * 0.28) + Math.sin(t * 0.2 + i) * 50;
      const y = h * (0.28 + Math.sin(t * 0.3 + i) * 0.05);
      this._butterfly(ctx, x, y, t, i + 2);
    }
  }
}

window.AmbientView = AmbientView;
