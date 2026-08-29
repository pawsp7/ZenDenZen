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
          clouds: { y0: 0.0, y1: 0.28, speed: 22, alpha: 0.55 },
          fog: { y0: 0.32, y1: 0.7, amp: 70, alpha: 0.62, speed: 0.32 },
          sway: { y0: 0.7, y1: 1, amp: 18, freq: 0.018, speed: 1.55, ghost: true },
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
          clouds: { y0: 0.0, y1: 0.28, speed: 20, alpha: 0.5 },
          water: { y0: 0.46, y1: 0.98, amp: 26, freq: 0.028, speed: 2.6 },
          sway: [
            { x0: 0.52, x1: 1, y0: 0.22, y1: 0.52, amp: 14, freq: 0.02, speed: 1.2 },
            { x0: 0.0, x1: 0.22, y0: 0.72, y1: 1, amp: 12, freq: 0.03, speed: 1.4, ghost: true },
          ],
          falls: { x0: 0.07, x1: 0.2, y0: 0.18, y1: 0.52, speed: 48 },
          sparkles: { y0: 0.5, y1: 0.94 },
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
          fog: { y0: 0.58, y1: 0.86, amp: 36, alpha: 0.32, speed: 0.2 },
          sway: { y0: 0.42, y1: 0.62, amp: 10, freq: 0.02, speed: 0.9 },
          sparkles: { y0: 0.58, y1: 0.96 },
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
          water: { x0: 0.38, x1: 1, y0: 0.5, y1: 0.9, amp: 22, freq: 0.045, speed: 2.4 },
          steam: { x0: 0.32, x1: 0.96, y0: 0.38, y1: 0.86 },
          falls: { x0: 0.84, x1: 0.96, y0: 0.42, y1: 0.62, speed: 56 },
          sway: { x0: 0.1, x1: 0.5, y0: 0.12, y1: 0.52, amp: 12, freq: 0.022, speed: 1.15 },
          flicker: true,
          sparkles: { y0: 0.52, y1: 0.86 },
        },
      },
      {
        id: "infinity",
        name: "Infinity light",
        blurb: "Warm pool, mountain haze, late-day gold.",
        plate: "./plates/spa-infinity.jpg",
        mood: "dusk",
        live: {
          water: { y0: 0.38, y1: 0.72, amp: 28, freq: 0.032, speed: 2.5 },
          steam: { x0: 0.18, x1: 0.78, y0: 0.36, y1: 0.7 },
          fog: { y0: 0.16, y1: 0.4, amp: 44, alpha: 0.4, speed: 0.22 },
          rays: { x: 0.12, y: 0.38 },
          sparkles: { y0: 0.4, y1: 0.72 },
          sway: [
            { x0: 0.0, x1: 0.3, y0: 0.46, y1: 1, amp: 16, freq: 0.02, speed: 1.2, ghost: true },
            { x0: 0.62, x1: 1, y0: 0.2, y1: 0.7, amp: 14, freq: 0.018, speed: 1.05 },
          ],
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
          water: { y0: 0.7, y1: 1, amp: 18, freq: 0.055, speed: 2.1 },
          steam: { x0: 0.08, x1: 0.92, y0: 0.62, y1: 0.96 },
          falls: { x0: 0.02, x1: 0.12, y0: 0.58, y1: 0.78, speed: 52 },
          sway: { y0: 0.08, y1: 0.62, amp: 11, freq: 0.016, speed: 1.05 },
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
          clouds: { y0: 0.0, y1: 0.2, speed: 16, alpha: 0.42 },
          water: { x0: 0.0, x1: 0.34, y0: 0.58, y1: 0.9, amp: 16, freq: 0.05, speed: 2.0 },
          sway: { y0: 0.16, y1: 1, amp: 20, freq: 0.014, speed: 1.35, ghost: true },
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
          water: { y0: 0.5, y1: 0.98, amp: 24, freq: 0.036, speed: 2.2 },
          sway: [
            { x0: 0.0, x1: 0.58, y0: 0.0, y1: 0.56, amp: 16, freq: 0.016, speed: 1.2, ghost: true },
            { x0: 0.52, x1: 1, y0: 0.02, y1: 0.58, amp: 12, freq: 0.02, speed: 1.05 },
          ],
          petals: "maple",
          sparkles: { y0: 0.54, y1: 0.92 },
          pollen: true,
        },
      },
      {
        id: "lantern",
        name: "Lantern hour",
        blurb: "Dusk path, hanging gold, first fireflies.",
        plate: "./plates/garden-lantern.jpg",
        mood: "dusk",
        live: {
          water: { x0: 0.58, x1: 1, y0: 0.62, y1: 0.98, amp: 14, freq: 0.05, speed: 1.8 },
          sway: { y0: 0.12, y1: 0.78, amp: 16, freq: 0.016, speed: 1.15, ghost: true },
          fireflies: 0.75,
          stars: true,
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
          clouds: { y0: 0.0, y1: 0.28, speed: 18, alpha: 0.4 },
          fog: { y0: 0.32, y1: 0.68, amp: 78, alpha: 0.58, speed: 0.26 },
          sway: { y0: 0.58, y1: 1, amp: 22, freq: 0.015, speed: 1.5, ghost: true },
          pollen: true,
          rays: { x: 0.5, y: 0.34 },
        },
      },
      {
        id: "lavender",
        name: "Lavender noon",
        blurb: "Purple rows, summer heat, a slow wide sky.",
        plate: "./plates/meadow-lavender.jpg",
        mood: "day",
        live: {
          clouds: { y0: 0.0, y1: 0.36, speed: 24, alpha: 0.52 },
          sway: { y0: 0.3, y1: 1, amp: 26, freq: 0.012, speed: 1.65, ghost: true },
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
          clouds: { y0: 0.0, y1: 0.32, speed: 12, alpha: 0.34 },
          fog: { y0: 0.34, y1: 0.62, amp: 54, alpha: 0.46, speed: 0.2 },
          sway: { y0: 0.48, y1: 1, amp: 20, freq: 0.016, speed: 1.3, ghost: true },
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

function eachSpec(value, fn) {
  if (!value) return;
  (Array.isArray(value) ? value : [value]).forEach(fn);
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
    this.motes = n(110, (_, i) => ({
      x: (i * 0.137 + 0.04) % 1,
      y: (i * 0.211 + 0.07) % 1,
      r: 1.4 + (i % 5) * 0.7,
      v: 0.018 + (i % 6) * 0.006,
      drift: 0.05 + (i % 4) * 0.025,
    }));
    this.stars = n(130, (_, i) => ({
      x: (i * 0.061 + 0.02) % 1,
      y: (i * 0.037) % 0.52,
      r: 0.7 + (i % 5) * 0.4,
      tw: 0.7 + (i % 7) * 0.25,
    }));
    this.snow = n(140, (_, i) => ({
      x: (i * 0.083) % 1,
      y: (i * 0.17) % 1,
      r: 1.6 + (i % 4) * 1.1,
      v: 0.06 + (i % 5) * 0.028,
      w: 0.025 + (i % 3) * 0.016,
    }));
    this.steam = n(70, (_, i) => ({
      x: (i * 0.073) % 1,
      y: (i * 0.11) % 1,
      r: 22 + (i % 6) * 14,
      v: 0.07 + (i % 5) * 0.028,
      wobble: 0.04 + (i % 4) * 0.02,
    }));
    this.rain = n(190, (_, i) => ({
      x: (i * 0.047) % 1,
      y: (i * 0.13) % 1,
      len: 18 + (i % 8) * 7,
      v: 1.2 + (i % 6) * 0.2,
    }));
    this.beads = n(28, (_, i) => ({
      x: 0.04 + (i % 14) * 0.068,
      y: 0.05 + Math.floor(i / 14) * 0.18 + (i % 5) * 0.03,
      r: 2.2 + (i % 4) * 0.9,
    }));
    this.fireflies = n(56, (_, i) => ({
      x: (i * 0.157) % 1,
      y: 0.28 + (i * 0.09) % 0.62,
      r: 1.8 + (i % 3) * 0.8,
      v: 0.24 + (i % 4) * 0.09,
      pulse: 1.1 + (i % 5) * 0.35,
    }));
    this.petals = n(42, (_, i) => ({
      x: (i * 0.19) % 1,
      y: (i * 0.27) % 1,
      s: 6.5 + (i % 4) * 2.8,
      v: 0.07 + (i % 4) * 0.028,
      spin: 0.7 + (i % 5) * 0.25,
    }));
    this.sparkles = n(64, (_, i) => ({
      x: (i * 0.11) % 1,
      y: (i * 0.07) % 1,
      life: (i * 0.17) % 1,
    }));
    this.foam = n(95, (_, i) => ({
      x: (i * 0.091) % 1,
      y: (i * 0.137) % 1,
      s: 1.4 + (i % 5) * 0.9,
      v: 0.055 + (i % 6) * 0.02,
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
      eachSpec(live.sway, (spec) => this.liveSway(t, spec));
      eachSpec(live.water, (spec) => this.liveWater(t, spec));
      eachSpec(live.falls, (spec) => this.liveFalls(t, spec));
      if (live.fog) this.liveFog(t, live.fog);
      if (live.clouds) this.liveClouds(t, live.clouds);
    }
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.reduced) return;

    eachSpec(live.sway, (spec) => this.liveBreeze(t, spec));
    eachSpec(live.water, (spec) => {
      this.liveCaustics(t, spec);
      this.liveFoam(t, spec);
    });
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
    ctx.globalAlpha = spec.alpha * 0.55;
    const shift2 = (t * spec.speed * 0.45 * this.dpr) % W;
    ctx.drawImage(source, 0, y, W, hh, -shift2, y + Math.sin(t * 0.2) * 6, W, hh);
    ctx.drawImage(source, 0, y, W, hh, -shift2 + W, y + Math.sin(t * 0.2) * 6, W, hh);
    ctx.restore();
  }

  liveFog(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y = spec.y0 * H;
    const hh = Math.max(1, (spec.y1 - spec.y0) * H);
    const amp = spec.amp * this.dpr;
    const shift = Math.sin(t * spec.speed) * amp + Math.sin(t * spec.speed * 0.37) * amp * 0.4;
    ctx.save();
    ctx.globalAlpha = spec.alpha;
    ctx.drawImage(source, 0, y, W, hh, shift, y, W, hh);
    ctx.globalAlpha = spec.alpha * 0.5;
    ctx.drawImage(
      source,
      0,
      y,
      W,
      hh,
      -shift * 0.65,
      y + Math.sin(t * spec.speed * 1.3) * 12,
      W,
      hh
    );
    ctx.restore();
  }

  liveWater(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y0 = Math.floor(spec.y0 * H);
    const y1 = Math.floor(spec.y1 * H);
    const x0 = Math.floor((spec.x0 ?? 0) * W);
    const x1 = Math.floor((spec.x1 ?? 1) * W);
    const ww = Math.max(1, x1 - x0);
    const amp = spec.amp * this.dpr;
    const pad = Math.ceil(amp + 8);
    const freq = spec.freq / this.dpr;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, ww, y1 - y0);
    ctx.clip();
    for (let y = y0; y < y1; y += 2) {
      const fade = (y - y0) / Math.max(1, y1 - y0);
      const swell = Math.sin(y * freq * 0.32 + t * spec.speed * 0.55) * amp * 0.9;
      const ripple = Math.sin(y * freq + t * spec.speed) * amp * 0.55;
      const chop = Math.sin(y * freq * 2.5 + t * spec.speed * 1.75) * amp * 0.28;
      const wave = (swell + ripple + chop) * (0.5 + fade * 0.5);
      const sx = Math.max(0, x0 - pad);
      const sw = Math.min(W - sx, ww + pad * 2);
      ctx.drawImage(source, sx, y, sw, 2, sx + wave, y, sw, 2);
    }
    ctx.restore();
  }

  liveSway(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const y0 = Math.floor(spec.y0 * H);
    const y1 = Math.floor(spec.y1 * H);
    const hh = Math.max(1, y1 - y0);
    const x0 = Math.floor((spec.x0 ?? 0) * W);
    const x1 = Math.floor((spec.x1 ?? 1) * W);
    const amp = spec.amp * this.dpr;
    const slice = Math.max(5, Math.round(5 * this.dpr));
    const step = Math.max(3, Math.round(3 * this.dpr));
    const freq = spec.freq / this.dpr;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, x1 - x0, hh);
    ctx.clip();
    for (let x = x0 - Math.ceil(amp) - slice; x < x1 + amp + slice; x += step) {
      const sx = Math.max(0, Math.min(W - slice, x));
      const wind =
        Math.sin(x * freq + t * spec.speed) * amp +
        Math.sin(x * freq * 1.7 + t * spec.speed * 0.62) * amp * 0.45;
      const lift = Math.sin(x * freq * 0.5 + t * spec.speed * 0.8) * amp * 0.22;
      const sy = Math.max(0, y0 - 6);
      ctx.drawImage(source, sx, sy, slice, hh + 12, x + wind, sy + lift, slice + 1, hh + 12);
    }
    if (spec.ghost) {
      ctx.globalAlpha = 0.28;
      const drift = Math.sin(t * spec.speed * 0.42) * amp * 0.7;
      ctx.drawImage(source, x0, y0, x1 - x0, hh, x0 + drift, y0, x1 - x0, hh);
    }
    ctx.restore();
  }

  liveFalls(t, spec) {
    const { ctx, source } = this;
    const W = source.width;
    const H = source.height;
    const x0 = Math.floor(spec.x0 * W);
    const x1 = Math.floor(spec.x1 * W);
    const y0 = Math.floor(spec.y0 * H);
    const y1 = Math.floor(spec.y1 * H);
    const hh = Math.max(1, y1 - y0);
    const ww = Math.max(1, x1 - x0);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, ww, hh);
    ctx.clip();
    for (let y = y0; y < y1; y += 2) {
      const srcY = Math.min(H - 2, Math.max(0, y + Math.floor(((t * spec.speed * this.dpr + y * 0.4) % 10) - 5)));
      ctx.drawImage(source, x0, srcY, ww, 2, x0, y, ww, 2);
    }
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 12; i += 1) {
      const x = x0 + ((i * 0.09 + t * 0.05) % 1) * ww;
      const y = y0 + ((t * spec.speed * 0.35 + i * 0.13) % 1) * hh;
      ctx.strokeStyle = `rgba(230, 245, 255, ${0.3 + (i % 3) * 0.1})`;
      ctx.lineWidth = 1.6 * this.dpr;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 2 * this.dpr, y + 22 * this.dpr);
      ctx.stroke();
    }
    ctx.restore();
  }

  liveBreeze(t, spec) {
    const { ctx, w, h } = this;
    const y0 = spec.y0 * h;
    const hh = (spec.y1 - spec.y0) * h;
    const x0 = (spec.x0 ?? 0) * w;
    const ww = ((spec.x1 ?? 1) - (spec.x0 ?? 0)) * w;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, ww, hh);
    ctx.clip();
    ctx.globalCompositeOperation = "soft-light";
    for (let i = 0; i < 3; i += 1) {
      const x = x0 + ((((t * 0.14 + i * 0.33) % 1.35) - 0.18) * ww);
      const g = ctx.createLinearGradient(x, 0, x + ww * 0.22, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,0.48)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x0, y0, ww, hh);
    }
    ctx.restore();
  }

  liveCaustics(t, spec) {
    const { ctx, w, h } = this;
    const y0 = spec.y0 * h;
    const hh = (spec.y1 - spec.y0) * h;
    const x0 = (spec.x0 ?? 0) * w;
    const ww = ((spec.x1 ?? 1) - (spec.x0 ?? 0)) * w;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, ww, hh);
    ctx.clip();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 7; i += 1) {
      const y = y0 + ((i / 7 + t * 0.06) % 1) * hh;
      const wobble = Math.sin(t * 1.1 + i) * ww * 0.04;
      const g = ctx.createLinearGradient(0, y - 10, 0, y + 10);
      g.addColorStop(0, "rgba(160, 220, 255, 0)");
      g.addColorStop(0.5, `rgba(200, 240, 255, ${0.22 + Math.sin(t * 1.4 + i) * 0.08})`);
      g.addColorStop(1, "rgba(160, 220, 255, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(x0 + wobble, y - 12, ww, 24);
    }
    ctx.restore();
  }

  liveFoam(t, spec) {
    const { ctx, w, h } = this;
    const y0 = spec.y0 * h;
    const span = (spec.y1 - spec.y0) * h;
    const x0 = (spec.x0 ?? 0) * w;
    const ww = ((spec.x1 ?? 1) - (spec.x0 ?? 0)) * w;
    this.foam.forEach((p, i) => {
      const x = x0 + ((p.x + t * p.v) % 1) * ww;
      const y = y0 + ((p.y + Math.sin(t * 0.45 + i) * 0.05 + 1) % 1) * span;
      ctx.fillStyle = `rgba(255,255,255,${0.16 + (i % 3) * 0.08})`;
      ctx.beginPath();
      ctx.ellipse(x, y, p.s * 2.4, p.s * 0.7, 0.15, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveRays(t, sun) {
    const { ctx, w, h } = this;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const pulse = 0.14 + Math.sin(t * 0.7) * 0.05;
    const g = ctx.createRadialGradient(w * sun.x, h * sun.y, 6, w * sun.x, h * sun.y, w * 0.4);
    g.addColorStop(0, `rgba(255, 228, 170, ${pulse})`);
    g.addColorStop(1, "rgba(255, 200, 120, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.translate(w * sun.x, h * sun.y);
    ctx.rotate(-0.35 + Math.sin(t * 0.15) * 0.05);
    ctx.fillStyle = `rgba(255, 220, 160, ${0.045 + Math.sin(t * 0.5) * 0.016})`;
    for (let i = 0; i < 7; i += 1) {
      ctx.rotate(0.22);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 0.55, -16);
      ctx.lineTo(w * 0.55, 16);
      ctx.fill();
    }
    ctx.restore();
  }

  liveSparkles(t, spec) {
    const { ctx, w, h } = this;
    this.sparkles.forEach((s, i) => {
      const phase = (s.life + t * 0.7) % 1;
      if (phase > 0.45) return;
      const a = Math.sin(phase * Math.PI) * 0.9;
      const x = ((s.x + t * 0.02) % 1) * w;
      const y = h * spec.y0 + ((s.y + i * 0.017) % 1) * h * (spec.y1 - spec.y0);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.1, 0, Math.PI * 2);
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
      g.addColorStop(0, `rgba(255, 236, 214, ${0.32 * fade})`);
      g.addColorStop(1, "rgba(255, 220, 190, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x * w, y * h, puff.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveRain(t) {
    const { ctx, w, h } = this;
    ctx.strokeStyle = "rgba(210, 230, 245, 0.48)";
    ctx.lineWidth = 1.4;
    this.rain.forEach((drop) => {
      const x = ((drop.x + t * 0.08) % 1) * w;
      const y = ((drop.y + t * drop.v) % 1) * h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 4, y + drop.len);
      ctx.stroke();
    });
    this.beads.forEach((bead, i) => {
      const y = bead.y * h + ((t * 10 + Math.sin(t * 0.4 + i) * 8) % (h * 0.4));
      ctx.fillStyle = "rgba(200, 230, 255, 0.5)";
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
      ctx.fillStyle = `rgba(255,255,255,${0.55 + Math.sin(t + i) * 0.25})`;
      ctx.beginPath();
      ctx.arc(x, y, flake.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveStars(t) {
    const { ctx, w, h } = this;
    this.stars.forEach((star, i) => {
      const a = 0.22 + Math.sin(t * star.tw + i) * 0.4;
      ctx.fillStyle = `rgba(230, 240, 255, ${Math.max(0.1, a)})`;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveAurora(t) {
    const { ctx, w, h } = this;
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let band = 0; band < 3; band += 1) {
      const a = 0.16 + Math.sin(t * 0.35 + band) * 0.06;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.22);
      for (let x = 0; x <= w; x += 18) {
        const y =
          h *
          (0.18 +
            band * 0.06 +
            Math.sin(x * 0.008 + t * 0.45 + band) * 0.05 +
            Math.sin(x * 0.02 + t * 0.7) * 0.02);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h * 0.52);
      ctx.lineTo(0, h * 0.52);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, h * 0.12, w, h * 0.48);
      g.addColorStop(0, `rgba(70, 230, 170, ${a})`);
      g.addColorStop(0.45, `rgba(150, 110, 255, ${a * 0.85})`);
      g.addColorStop(1, "rgba(70, 230, 170, 0)");
      ctx.fillStyle = g;
      ctx.fill();
    }
    ctx.restore();
  }

  livePetals(t, kind) {
    const { ctx, w, h } = this;
    this.petals.forEach((petal, i) => {
      const x = ((petal.x + Math.sin(t * 0.5 + i) * 0.14 + t * 0.02) % 1) * w;
      const y = ((petal.y + t * petal.v) % 1) * h;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(t * petal.spin + i);
      ctx.fillStyle =
        kind === "maple"
          ? i % 2
            ? "rgba(210, 70, 40, 0.82)"
            : "rgba(230, 120, 40, 0.78)"
          : "rgba(255, 210, 190, 0.8)";
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
      const y = ((m.y + Math.sin(t * m.drift + i) * 0.06 + t * 0.016 + 1) % 1) * h;
      ctx.fillStyle = `rgba(255,255,220,${0.38 + Math.sin(t * 2 + i) * 0.16})`;
      ctx.beginPath();
      ctx.arc(x, y, m.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveFireflies(t, scale) {
    const { ctx, w, h } = this;
    const span = typeof scale === "number" ? scale : 1;
    this.fireflies.forEach((bug, i) => {
      const x = ((bug.x + Math.sin(t * bug.v + i) * 0.1) % 1) * w;
      const y =
        ((bug.y + Math.cos(t * bug.v * 0.7 + i) * 0.06) % 1) * h * span + h * (1 - span) * 0.12;
      const a = 0.22 + Math.max(0, Math.sin(t * bug.pulse + i)) * 0.9;
      const g = ctx.createRadialGradient(x, y, 0, x, y, bug.r * 12);
      g.addColorStop(0, `rgba(255, 230, 110, ${a})`);
      g.addColorStop(1, "rgba(255, 200, 60, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, bug.r * 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 250, 180, ${a})`;
      ctx.beginPath();
      ctx.arc(x, y, bug.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  liveFlicker(t) {
    const { ctx, w, h } = this;
    const a = 0.045 + Math.sin(t * 9.4) * 0.024 + Math.sin(t * 17.2) * 0.014;
    ctx.fillStyle = `rgba(255, 170, 70, ${Math.max(0, a)})`;
    ctx.fillRect(0, 0, w, h);
  }
}

window.SCENES = SCENES;
window.AmbientView = AmbientView;
window.optionOf = optionOf;
