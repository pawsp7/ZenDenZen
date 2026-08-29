const SCENES = {
  mountains: {
    title: "Mountains",
    accent: "#f0c36a",
    options: [
      {
        id: "mist",
        name: "Valley mist",
        blurb: "Dawn fog in the hollows, gold on the ridges.",
        plate: "./plates/mountains-mist.jpg",
        mood: "dawn",
        live: {
          clouds: { y0: 0.02, y1: 0.34, speed: 14, alpha: 0.38 },
          fog: { y0: 0.36, y1: 0.64, amp: 48, alpha: 0.5, speed: 0.28 },
          sway: { y0: 0.68, y1: 1, amp: 6, freq: 0.02, speed: 1.4 },
          rays: { x: 0.2, y: 0.4 },
          pollen: true,
        },
      },
      {
        id: "lake",
        name: "Mirror lake",
        blurb: "Still glacial water, bright peaks, a high quiet day.",
        plate: "./plates/mountains-lake.jpg",
        mood: "day",
        live: {
          clouds: { y0: 0.0, y1: 0.3, speed: 12, alpha: 0.32 },
          water: { y0: 0.48, y1: 1, amp: 14, freq: 0.038, speed: 2.3 },
          sway: { y0: 0.28, y1: 0.52, amp: 4.5, freq: 0.016, speed: 1.15 },
          sparkles: { y0: 0.5, y1: 0.92 },
          pollen: true,
        },
      },
      {
        id: "night",
        name: "Star field",
        blurb: "Snow peaks, aurora hush, a high winter night.",
        plate: "./plates/mountains-night.jpg",
        mood: "night",
        live: {
          stars: true,
          aurora: true,
          snow: true,
          water: { y0: 0.62, y1: 1, amp: 7, freq: 0.05, speed: 1.4 },
        },
      },
    ],
  },
  spa: {
    title: "Spa",
    accent: "#ffb38a",
    options: [
      {
        id: "onsen",
        name: "Stone bath",
        blurb: "Cedar, mineral steam, lantern light on wet stone.",
        plate: "./plates/spa-onsen.jpg",
        mood: "night",
        live: {
          water: { y0: 0.52, y1: 0.86, amp: 11, freq: 0.055, speed: 2.1 },
          steam: { x0: 0.28, x1: 0.92, y0: 0.42, y1: 0.86 },
          flicker: true,
          sparkles: { y0: 0.55, y1: 0.82 },
        },
      },
      {
        id: "infinity",
        name: "Infinity light",
        blurb: "Warm pool, mountain haze, late-day gold.",
        plate: "./plates/spa-infinity.jpg",
        mood: "dusk",
        live: {
          water: { y0: 0.42, y1: 0.86, amp: 13, freq: 0.042, speed: 2.4 },
          steam: { x0: 0.1, x1: 0.9, y0: 0.4, y1: 0.78 },
          rays: { x: 0.72, y: 0.42 },
          sparkles: { y0: 0.46, y1: 0.84 },
          sway: { y0: 0.2, y1: 0.55, amp: 5, freq: 0.018, speed: 1.1 },
        },
      },
      {
        id: "rain",
        name: "Rain glass",
        blurb: "Warm stone inside, rain on the garden glass.",
        plate: "./plates/spa-rain.jpg",
        mood: "dusk",
        live: {
          rain: true,
          water: { y0: 0.68, y1: 1, amp: 8, freq: 0.07, speed: 1.8 },
          flicker: true,
        },
      },
    ],
  },
  garden: {
    title: "Garden",
    accent: "#7ed38a",
    options: [
      {
        id: "rose",
        name: "Rose walk",
        blurb: "Morning dew, pollen, a walled path of blooms.",
        plate: "./plates/garden-rose.jpg",
        mood: "day",
        live: {
          clouds: { y0: 0.0, y1: 0.22, speed: 10, alpha: 0.26 },
          sway: { y0: 0.12, y1: 1, amp: 8, freq: 0.014, speed: 1.25 },
          petals: "blush",
          pollen: true,
          rays: { x: 0.78, y: 0.18 },
        },
      },
      {
        id: "zen",
        name: "Maple pond",
        blurb: "Koi water, falling leaves, a still Japanese garden.",
        plate: "./plates/garden-zen.jpg",
        mood: "day",
        live: {
          water: { y0: 0.58, y1: 0.92, amp: 11, freq: 0.05, speed: 1.9 },
          sway: { y0: 0.08, y1: 0.7, amp: 6.5, freq: 0.014, speed: 1.15 },
          petals: "maple",
          sparkles: { y0: 0.6, y1: 0.88 },
        },
      },
      {
        id: "lantern",
        name: "Lantern hour",
        blurb: "Dusk path, hanging gold, first fireflies.",
        plate: "./plates/garden-lantern.jpg",
        mood: "dusk",
        live: {
          sway: { y0: 0.15, y1: 1, amp: 6, freq: 0.016, speed: 1.1 },
          fireflies: 0.7,
          flicker: true,
          pollen: true,
        },
      },
    ],
  },
  meadow: {
    title: "Meadow",
    accent: "#d4a0ff",
    options: [
      {
        id: "dawn",
        name: "Dawn fog",
        blurb: "Wildflowers, river mist, a pale peach sky.",
        plate: "./plates/meadow-dawn.jpg",
        mood: "dawn",
        live: {
          clouds: { y0: 0.0, y1: 0.36, speed: 12, alpha: 0.34 },
          fog: { y0: 0.4, y1: 0.72, amp: 52, alpha: 0.48, speed: 0.22 },
          sway: { y0: 0.42, y1: 1, amp: 10, freq: 0.016, speed: 1.45 },
          pollen: true,
        },
      },
      {
        id: "lavender",
        name: "Lavender noon",
        blurb: "Purple rows, summer heat, a slow wide sky.",
        plate: "./plates/meadow-lavender.jpg",
        mood: "day",
        live: {
          clouds: { y0: 0.0, y1: 0.38, speed: 14, alpha: 0.36 },
          sway: { y0: 0.34, y1: 1, amp: 13, freq: 0.012, speed: 1.5 },
          pollen: true,
        },
      },
      {
        id: "fireflies",
        name: "Firefly dusk",
        blurb: "Tall grass, warm sparks, a blue-hour meadow.",
        plate: "./plates/meadow-fireflies.jpg",
        mood: "night",
        live: {
          fog: { y0: 0.42, y1: 0.68, amp: 40, alpha: 0.36, speed: 0.18 },
          sway: { y0: 0.4, y1: 1, amp: 9, freq: 0.017, speed: 1.25 },
          fireflies: 1,
        },
      },
    ],
  },
};

function optionOf(scene, index) {
  const list = SCENES[scene].options;
  return list[((index % list.length) + list.length) % list.length];
}

class AmbientView {
  constructor(root) {
    this.root = root;
    this.plate = root.querySelector(".plate");
    this.canvas = root.querySelector(".atmosphere");
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.source = document.createElement("canvas");
    this.sctx = this.source.getContext("2d", { alpha: false });
    this.image = new Image();
    this.image.onload = () => this.blitSource();
    this.scene = "mountains";
    this.optionIndex = 0;
    this.option = optionOf("mountains", 0);
    this.running = true;
    this.elapsed = 0;
    this.last = performance.now();
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.raf = 0;
    this.ready = false;
    this.prime();
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const w = this.root.clientWidth || window.innerWidth;
    const h = this.root.clientHeight || window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.source.width = this.canvas.width;
    this.source.height = this.canvas.height;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.sctx.setTransform(1, 0, 0, 1, 0, 0);
    this.blitSource();
  }

  coverDraw(ctx, img, w, h) {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih) return;
    const scale = Math.max(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  blitSource() {
    if (!this.image.naturalWidth || !this.w) {
      this.ready = false;
      this.root.classList.remove("is-live");
      return;
    }
    this.sctx.fillStyle = "#8fd6ff";
    this.sctx.fillRect(0, 0, this.source.width, this.source.height);
    this.coverDraw(this.sctx, this.image, this.source.width, this.source.height);
    this.ready = true;
    this.root.classList.add("is-live");
  }

  prime() {
    const n = (count, make) => Array.from({ length: count }, make);
    this.motes = n(70, (_, i) => ({
      x: (i * 0.137 + 0.04) % 1,
      y: (i * 0.211 + 0.07) % 1,
      r: 1.1 + (i % 5) * 0.55,
      v: 0.012 + (i % 6) * 0.004,
      drift: 0.04 + (i % 4) * 0.02,
    }));
    this.stars = n(110, (_, i) => ({
      x: (i * 0.061 + 0.02) % 1,
      y: (i * 0.037) % 0.52,
      r: 0.6 + (i % 5) * 0.35,
      tw: 0.7 + (i % 7) * 0.25,
    }));
    this.snow = n(90, (_, i) => ({
      x: (i * 0.083) % 1,
      y: (i * 0.17) % 1,
      r: 1.1 + (i % 4) * 0.7,
      v: 0.045 + (i % 5) * 0.02,
      w: 0.02 + (i % 3) * 0.012,
    }));
    this.steam = n(55, (_, i) => ({
      x: (i * 0.073) % 1,
      y: (i * 0.11) % 1,
      r: 16 + (i % 6) * 10,
      v: 0.055 + (i % 5) * 0.02,
      wobble: 0.03 + (i % 4) * 0.015,
    }));
    this.rain = n(160, (_, i) => ({
      x: (i * 0.047) % 1,
      y: (i * 0.13) % 1,
      len: 16 + (i % 8) * 6,
      v: 1.15 + (i % 6) * 0.18,
    }));
    this.beads = n(22, (_, i) => ({
      x: 0.06 + (i % 11) * 0.085,
      y: 0.06 + Math.floor(i / 11) * 0.2 + (i % 5) * 0.03,
      r: 1.8 + (i % 4) * 0.7,
    }));
    this.fireflies = n(42, (_, i) => ({
      x: (i * 0.157) % 1,
      y: 0.28 + (i * 0.09) % 0.62,
      r: 1.6 + (i % 3) * 0.7,
      v: 0.22 + (i % 4) * 0.08,
      pulse: 1.1 + (i % 5) * 0.35,
    }));
    this.petals = n(28, (_, i) => ({
      x: (i * 0.19) % 1,
      y: (i * 0.27) % 1,
      s: 5.5 + (i % 4) * 2.4,
      v: 0.055 + (i % 4) * 0.02,
      spin: 0.7 + (i % 5) * 0.25,
    }));
    this.sparkles = n(36, (_, i) => ({
      x: (i * 0.11) % 1,
      y: (i * 0.07) % 1,
      life: (i * 0.17) % 1,
    }));
  }

  setScene(name, optionIndex = 0) {
    this.scene = name;
    this.optionIndex = optionIndex;
    this.option = optionOf(name, optionIndex);
    const src = this.option.plate;
    if (this.plate.getAttribute("src") !== src) this.plate.src = src;
    if (this.loadedSrc !== src) {
      this.loadedSrc = src;
      this.ready = false;
      this.root.classList.remove("is-live");
      this.image.src = src;
    } else {
      this.blitSource();
    }
  }

  setPlaying(playing) {
    this.running = playing;
    this.root.classList.toggle("is-paused", !playing);
    if (playing) this.last = performance.now();
  }

  start() {
    const loop = (now) => {
      if (this.running) this.elapsed += (now - this.last) * 0.001;
      this.last = now;
      this.draw(this.elapsed);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  draw(t) {
    const { ctx, option } = this;
    if (!this.w || !this.h || !option || !this.ready) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.source, 0, 0);
    const live = option.live || {};
    if (!this.reduced) {
      if (live.clouds) this.liveClouds(t, live.clouds);
      if (live.fog) this.liveFog(t, live.fog);
      if (live.water) this.liveWater(t, live.water);
      if (live.sway) this.liveSway(t, live.sway);
    }
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.reduced) return;

    if (live.rays) this.liveRays(t, live.rays);
    if (live.sparkles) this.liveSparkles(t, live.sparkles);
    if (live.steam) this.liveSteam(t, live.steam);
    if (live.rain) this.liveRain(t);
    if (live.snow) this.liveSnow(t);
    if (live.stars) this.liveStars(t);
    if (live.aurora) this.liveAurora(t);
    if (live.petals) this.livePetals(t, live.petals);
    if (live.pollen) this.livePollen(t);
    if (live.fireflies) this.liveFireflies(t, live.fireflies);
    if (live.flicker) this.liveFlicker(t);
  }

  liveClouds(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y = spec.y0 * H;
    const hh = Math.max(1, (spec.y1 - spec.y0) * H);
    const shift = (t * spec.speed * this.dpr) % W;
    ctx.save();
    ctx.globalAlpha = spec.alpha;
    ctx.drawImage(source, 0, y, W, hh, shift, y, W, hh);
    ctx.drawImage(source, 0, y, W, hh, shift - W, y, W, hh);
    ctx.restore();
  }

  liveFog(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y = spec.y0 * H;
    const hh = Math.max(1, (spec.y1 - spec.y0) * H);
    const amp = spec.amp * this.dpr;
    const shift = Math.sin(t * spec.speed) * amp + Math.sin(t * spec.speed * 0.37) * amp * 0.35;
    ctx.save();
    ctx.globalAlpha = spec.alpha;
    ctx.drawImage(source, 0, y, W, hh, shift, y, W, hh);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = spec.alpha * 0.45;
    ctx.drawImage(source, 0, y, W, hh, -shift * 0.6, y + Math.sin(t * 0.4) * 8, W, hh);
    ctx.restore();
  }

  liveWater(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y0 = Math.floor(spec.y0 * H);
    const y1 = Math.floor(spec.y1 * H);
    const amp = spec.amp * this.dpr;
    const pad = amp * 2 + 8;
    for (let y = y0; y < y1; y += 2) {
      const fade = (y - y0) / Math.max(1, y1 - y0);
      const wave =
        Math.sin(y * (spec.freq / this.dpr) + t * spec.speed) * amp +
        Math.sin(y * (spec.freq / this.dpr) * 2.3 + t * spec.speed * 1.6) * amp * 0.35;
      ctx.drawImage(source, 0, y, W, 2, wave * (0.35 + fade * 0.65) - pad, y, W + pad * 2, 2);
    }
  }

  liveSway(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y0 = Math.floor(spec.y0 * H);
    const y1 = Math.floor(spec.y1 * H);
    const amp = spec.amp * this.dpr;
    const pad = amp * 2 + 8;
    for (let y = y0; y < y1; y += 2) {
      const fade = (y - y0) / Math.max(1, y1 - y0);
      const wave =
        Math.sin(y * (spec.freq / this.dpr) + t * spec.speed) * amp * (0.25 + fade * 0.85) +
        Math.sin(y * 0.01 + t * spec.speed * 0.6) * amp * 0.25;
      ctx.drawImage(source, 0, y, W, 2, wave - pad, y, W + pad * 2, 2);
    }
  }

  liveRays(t, sun) {
    const { ctx, w, h } = this;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const pulse = 0.12 + Math.sin(t * 0.7) * 0.04;
    const g = ctx.createRadialGradient(w * sun.x, h * sun.y, 6, w * sun.x, h * sun.y, w * 0.38);
    g.addColorStop(0, `rgba(255, 228, 170, ${pulse})`);
    g.addColorStop(1, "rgba(255, 200, 120, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.translate(w * sun.x, h * sun.y);
    ctx.rotate(-0.35 + Math.sin(t * 0.15) * 0.04);
    ctx.fillStyle = `rgba(255, 220, 160, ${0.035 + Math.sin(t * 0.5) * 0.012})`;
    for (let i = 0; i < 7; i += 1) {
      ctx.rotate(0.22);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 0.55, -14);
      ctx.lineTo(w * 0.55, 14);
      ctx.fill();
    }
    ctx.restore();
  }

  liveSparkles(t, spec) {
    const { ctx, w, h } = this;
    this.sparkles.forEach((s, i) => {
      const phase = (s.life + t * 0.55) % 1;
      if (phase > 0.28) return;
      const a = Math.sin(phase * Math.PI) * 0.85;
      const x = ((s.x + t * 0.015) % 1) * w;
      const y = h * spec.y0 + ((s.y + i * 0.017) % 1) * h * (spec.y1 - spec.y0);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveSteam(t, spec) {
    const { ctx, w, h } = this;
    this.steam.forEach((puff, i) => {
      const localY = ((puff.y - t * puff.v) % 1 + 1) % 1;
      const x = spec.x0 + ((puff.x + Math.sin(t * 0.7 + i) * puff.wobble) % 1) * (spec.x1 - spec.x0);
      const y = spec.y0 + localY * (spec.y1 - spec.y0);
      const fade = Math.max(0, 1 - localY);
      const g = ctx.createRadialGradient(x * w, y * h, 2, x * w, y * h, puff.r);
      g.addColorStop(0, `rgba(255, 236, 214, ${0.22 * fade})`);
      g.addColorStop(1, "rgba(255, 220, 190, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x * w, y * h, puff.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveRain(t) {
    const { ctx, w, h } = this;
    ctx.strokeStyle = "rgba(210, 230, 245, 0.42)";
    ctx.lineWidth = 1.3;
    this.rain.forEach((drop) => {
      const x = ((drop.x + t * 0.08) % 1) * w;
      const y = ((drop.y + t * drop.v) % 1) * h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 4, y + drop.len);
      ctx.stroke();
    });
    this.beads.forEach((bead, i) => {
      const y = bead.y * h + (t * 8 + Math.sin(t * 0.4 + i) * 6) % (h * 0.35);
      ctx.fillStyle = "rgba(200, 230, 255, 0.4)";
      ctx.beginPath();
      ctx.ellipse(bead.x * w, y, bead.r * 0.7, bead.r, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveSnow(t) {
    const { ctx, w, h } = this;
    this.snow.forEach((flake, i) => {
      const x = ((flake.x + t * flake.w) % 1) * w;
      const y = ((flake.y + t * flake.v) % 1) * h;
      ctx.fillStyle = `rgba(255,255,255,${0.45 + Math.sin(t + i) * 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, flake.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveStars(t) {
    const { ctx, w, h } = this;
    this.stars.forEach((star, i) => {
      const a = 0.2 + Math.sin(t * star.tw + i) * 0.35;
      ctx.fillStyle = `rgba(230, 240, 255, ${Math.max(0.08, a)})`;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveAurora(t) {
    const { ctx, w, h } = this;
    const a = 0.1 + Math.sin(t * 0.35) * 0.045;
    const g = ctx.createLinearGradient(0, h * 0.12, w, h * 0.46);
    g.addColorStop(0, `rgba(70, 230, 170, ${a})`);
    g.addColorStop(0.45, `rgba(150, 110, 255, ${a * 0.8})`);
    g.addColorStop(1, "rgba(70, 230, 170, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h * 0.5);
  }

  livePetals(t, kind) {
    const { ctx, w, h } = this;
    this.petals.forEach((petal, i) => {
      const x = ((petal.x + Math.sin(t * 0.5 + i) * 0.12) % 1) * w;
      const y = ((petal.y + t * petal.v) % 1) * h;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(t * petal.spin + i);
      ctx.fillStyle =
        kind === "maple"
          ? i % 2
            ? "rgba(210, 70, 40, 0.72)"
            : "rgba(230, 120, 40, 0.68)"
          : "rgba(255, 210, 190, 0.7)";
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.s, petal.s * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  livePollen(t) {
    const { ctx, w, h } = this;
    this.motes.forEach((m, i) => {
      const x = ((m.x + t * m.v) % 1) * w;
      const y = ((m.y + Math.sin(t * m.drift + i) * 0.05 + t * 0.012 + 1) % 1) * h;
      ctx.fillStyle = `rgba(255,255,230,${0.28 + Math.sin(t * 2 + i) * 0.12})`;
      ctx.beginPath();
      ctx.arc(x, y, m.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveFireflies(t, scale) {
    const { ctx, w, h } = this;
    const span = typeof scale === "number" ? scale : 1;
    this.fireflies.forEach((bug, i) => {
      const x = ((bug.x + Math.sin(t * bug.v + i) * 0.08) % 1) * w;
      const y =
        ((bug.y + Math.cos(t * bug.v * 0.7 + i) * 0.05) % 1) * h * span +
        h * (1 - span) * 0.12;
      const a = 0.2 + Math.max(0, Math.sin(t * bug.pulse + i)) * 0.85;
      const g = ctx.createRadialGradient(x, y, 0, x, y, bug.r * 10);
      g.addColorStop(0, `rgba(255, 230, 110, ${a})`);
      g.addColorStop(1, "rgba(255, 200, 60, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, bug.r * 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 250, 180, ${a})`;
      ctx.beginPath();
      ctx.arc(x, y, bug.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveFlicker(t) {
    const { ctx, w, h } = this;
    const a = 0.035 + Math.sin(t * 9.4) * 0.02 + Math.sin(t * 17.2) * 0.012;
    ctx.fillStyle = `rgba(255, 170, 70, ${Math.max(0, a)})`;
    ctx.fillRect(0, 0, w, h);
  }
}

window.SCENES = SCENES;
window.AmbientView = AmbientView;
window.optionOf = optionOf;
