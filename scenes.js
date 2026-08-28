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
        weather: "mist",
        mood: "dawn",
        sun: [0.2, 0.4],
        fogY: 0.46,
      },
      {
        id: "lake",
        name: "Mirror lake",
        blurb: "Still glacial water, bright peaks, a high quiet day.",
        plate: "./plates/mountains-lake.jpg",
        weather: "lake",
        mood: "day",
        waterY: 0.52,
      },
      {
        id: "night",
        name: "Star field",
        blurb: "Snow peaks, aurora hush, a high winter night.",
        plate: "./plates/mountains-night.jpg",
        weather: "night",
        mood: "night",
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
        weather: "steam",
        mood: "night",
        waterY: 0.58,
      },
      {
        id: "infinity",
        name: "Infinity light",
        blurb: "Warm pool, mountain haze, late-day gold.",
        plate: "./plates/spa-infinity.jpg",
        weather: "caustics",
        mood: "dusk",
        waterY: 0.48,
        sun: [0.72, 0.42],
      },
      {
        id: "rain",
        name: "Rain glass",
        blurb: "Warm stone inside, rain on the garden glass.",
        plate: "./plates/spa-rain.jpg",
        weather: "rain",
        mood: "dusk",
        waterY: 0.62,
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
        weather: "pollen",
        mood: "day",
      },
      {
        id: "zen",
        name: "Maple pond",
        blurb: "Koi water, falling leaves, a still Japanese garden.",
        plate: "./plates/garden-zen.jpg",
        weather: "petals",
        mood: "day",
        waterY: 0.62,
      },
      {
        id: "lantern",
        name: "Lantern hour",
        blurb: "Dusk path, hanging gold, first fireflies.",
        plate: "./plates/garden-lantern.jpg",
        weather: "lantern",
        mood: "dusk",
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
        weather: "groundfog",
        mood: "dawn",
        fogY: 0.55,
      },
      {
        id: "lavender",
        name: "Lavender noon",
        blurb: "Purple rows, summer heat, a slow wide sky.",
        plate: "./plates/meadow-lavender.jpg",
        weather: "heat",
        mood: "day",
      },
      {
        id: "fireflies",
        name: "Firefly dusk",
        blurb: "Tall grass, warm sparks, a blue-hour meadow.",
        plate: "./plates/meadow-fireflies.jpg",
        weather: "fireflies",
        mood: "night",
        fogY: 0.5,
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
    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.scene = "mountains";
    this.optionIndex = 0;
    this.option = optionOf("mountains", 0);
    this.running = true;
    this.speed = 0.22;
    this.elapsed = 0;
    this.last = performance.now();
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.reduced) this.speed = 0.04;
    this.raf = 0;
    this.prime();
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

  prime() {
    const n = (count, make) => Array.from({ length: count }, make);
    this.motes = n(36, (_, i) => ({
      x: (i * 0.137 + 0.04) % 1,
      y: (i * 0.211 + 0.07) % 1,
      r: 0.5 + (i % 5) * 0.28,
      v: 0.0018 + (i % 6) * 0.0007,
      drift: 0.008 + (i % 4) * 0.004,
    }));
    this.fog = n(7, (_, i) => ({
      x: (i * 0.19) % 1,
      y: 0.38 + (i % 3) * 0.08,
      w: 0.55 + (i % 4) * 0.12,
      h: 0.08 + (i % 3) * 0.03,
      v: 0.004 + (i % 3) * 0.002,
    }));
    this.stars = n(90, (_, i) => ({
      x: (i * 0.061 + 0.02) % 1,
      y: ((i * 0.037) % 0.55),
      r: 0.4 + (i % 5) * 0.25,
      tw: 0.4 + (i % 7) * 0.18,
    }));
    this.snow = n(48, (_, i) => ({
      x: (i * 0.083) % 1,
      y: (i * 0.17) % 1,
      r: 0.7 + (i % 4) * 0.4,
      v: 0.012 + (i % 5) * 0.004,
      w: 0.008 + (i % 3) * 0.004,
    }));
    this.steam = n(40, (_, i) => ({
      x: 0.35 + (i % 10) * 0.04 + (i * 0.01) % 0.2,
      y: 0.55 + (i % 8) * 0.04,
      r: 8 + (i % 6) * 5,
      v: 0.018 + (i % 5) * 0.006,
      wobble: 0.012 + (i % 4) * 0.006,
    }));
    this.rain = n(110, (_, i) => ({
      x: (i * 0.047) % 1,
      y: (i * 0.13) % 1,
      len: 12 + (i % 8) * 4,
      v: 0.55 + (i % 6) * 0.08,
    }));
    this.beads = n(18, (_, i) => ({
      x: 0.08 + (i % 9) * 0.1,
      y: 0.08 + Math.floor(i / 9) * 0.18 + (i % 5) * 0.03,
      r: 1.4 + (i % 4) * 0.6,
    }));
    this.fireflies = n(26, (_, i) => ({
      x: (i * 0.157) % 1,
      y: 0.35 + (i * 0.09) % 0.55,
      r: 1.2 + (i % 3) * 0.5,
      v: 0.008 + (i % 4) * 0.003,
      pulse: 0.6 + (i % 5) * 0.25,
    }));
    this.petals = n(16, (_, i) => ({
      x: (i * 0.19) % 1,
      y: (i * 0.27) % 1,
      s: 4 + (i % 4) * 2,
      v: 0.016 + (i % 4) * 0.006,
      spin: 0.4 + (i % 5) * 0.2,
    }));
    this.sparkles = n(22, (_, i) => ({
      x: (i * 0.11) % 1,
      y: 0.5 + (i * 0.07) % 0.4,
      life: (i * 0.17) % 1,
    }));
  }

  setScene(name, optionIndex = 0) {
    this.scene = name;
    this.optionIndex = optionIndex;
    this.option = optionOf(name, optionIndex);
    if (this.plate.getAttribute("src") !== this.option.plate) {
      this.plate.src = this.option.plate;
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
    const { ctx, w, h, option } = this;
    if (!w || !h || !option) return;
    ctx.clearRect(0, 0, w, h);
    const weather = option.weather;
    if (weather === "mist") this.drawMist(t);
    else if (weather === "lake") this.drawLake(t);
    else if (weather === "night") this.drawNight(t);
    else if (weather === "steam") this.drawSteam(t);
    else if (weather === "caustics") this.drawCaustics(t);
    else if (weather === "rain") this.drawRain(t);
    else if (weather === "pollen") this.drawPollen(t);
    else if (weather === "petals") this.drawPetals(t);
    else if (weather === "lantern") this.drawLantern(t);
    else if (weather === "groundfog") this.drawGroundFog(t);
    else if (weather === "heat") this.drawHeat(t);
    else if (weather === "fireflies") this.drawFireflies(t);
  }

  drawMist(t) {
    const { ctx, w, h, option } = this;
    const [sx, sy] = option.sun;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const glow = 0.07 + Math.sin(t * 0.35) * 0.02;
    const grad = ctx.createRadialGradient(w * sx, h * sy, 8, w * sx, h * sy, w * 0.42);
    grad.addColorStop(0, `rgba(255, 228, 180, ${glow + 0.08})`);
    grad.addColorStop(1, "rgba(255, 200, 140, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    this.fog.forEach((bank, i) => {
      const x = ((bank.x + t * bank.v) % 1.4) * w - w * 0.2;
      const y = h * (option.fogY + bank.y - 0.4) + Math.sin(t * 0.2 + i) * 10;
      const g = ctx.createRadialGradient(x, y, 10, x, y, w * bank.w * 0.5);
      g.addColorStop(0, "rgba(255, 250, 245, 0.16)");
      g.addColorStop(1, "rgba(255, 250, 245, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, w * bank.w * 0.5, h * bank.h, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    this.drawMotes(t, 0.14);
  }

  drawLake(t) {
    const { ctx, w, h, option } = this;
    const y0 = h * option.waterY;
    ctx.fillStyle = "rgba(180, 230, 255, 0.05)";
    for (let i = 0; i < 8; i += 1) {
      const y = y0 + i * 14 + Math.sin(t * 0.5 + i) * 3;
      ctx.beginPath();
      ctx.ellipse(w * 0.5, y, w * 0.46, 9, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    const shadowX = ((t * 0.012) % 1.6) * w - w * 0.3;
    const sg = ctx.createRadialGradient(shadowX, h * 0.28, 20, shadowX, h * 0.28, w * 0.34);
    sg.addColorStop(0, "rgba(20, 40, 70, 0.08)");
    sg.addColorStop(1, "rgba(20, 40, 70, 0)");
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, w, h * 0.55);
    this.drawSparkles(t, option.waterY, 0.9);
    this.drawMotes(t, 0.1);
  }

  drawNight(t) {
    const { ctx, w, h } = this;
    this.stars.forEach((star, i) => {
      const a = 0.25 + Math.sin(t * star.tw + i) * 0.22;
      ctx.fillStyle = `rgba(230, 240, 255, ${a})`;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    const aurora = 0.06 + Math.sin(t * 0.18) * 0.03;
    const ag = ctx.createLinearGradient(0, h * 0.18, w, h * 0.42);
    ag.addColorStop(0, `rgba(80, 220, 170, ${aurora})`);
    ag.addColorStop(0.5, `rgba(160, 120, 255, ${aurora * 0.7})`);
    ag.addColorStop(1, "rgba(80, 220, 170, 0)");
    ctx.fillStyle = ag;
    ctx.fillRect(0, 0, w, h * 0.5);
    this.snow.forEach((flake, i) => {
      const x = ((flake.x + t * flake.w) % 1) * w;
      const y = ((flake.y + t * flake.v) % 1) * h;
      ctx.fillStyle = `rgba(255,255,255,${0.28 + Math.sin(t + i) * 0.12})`;
      ctx.beginPath();
      ctx.arc(x, y, flake.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawSteam(t) {
    const { ctx, w, h, option } = this;
    this.steam.forEach((puff, i) => {
      const y = ((puff.y - t * puff.v) % 1 + 1) % 1;
      const x = puff.x + Math.sin(t * 0.4 + i) * puff.wobble;
      const fade = Math.max(0, 1 - y * 1.1);
      const g = ctx.createRadialGradient(x * w, y * h, 2, x * w, y * h, puff.r);
      g.addColorStop(0, `rgba(255, 230, 200, ${0.1 * fade})`);
      g.addColorStop(1, "rgba(255, 220, 180, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x * w, y * h, puff.r, 0, Math.PI * 2);
      ctx.fill();
    });
    this.drawWaterBands(t, option.waterY, "rgba(255, 200, 140, 0.05)");
    const flicker = 0.04 + Math.sin(t * 7.3) * 0.015 + Math.sin(t * 13.1) * 0.01;
    ctx.fillStyle = `rgba(255, 170, 80, ${flicker})`;
    ctx.fillRect(0, 0, w, h);
  }

  drawCaustics(t) {
    const { ctx, w, h, option } = this;
    this.drawWaterBands(t, option.waterY, "rgba(120, 230, 255, 0.06)");
    this.drawSparkles(t, option.waterY, 0.85);
    if (option.sun) {
      const [sx, sy] = option.sun;
      const g = ctx.createRadialGradient(w * sx, h * sy, 4, w * sx, h * sy, w * 0.3);
      g.addColorStop(0, `rgba(255, 210, 140, ${0.08 + Math.sin(t * 0.4) * 0.02})`);
      g.addColorStop(1, "rgba(255, 180, 80, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    this.drawMotes(t, 0.12);
  }

  drawRain(t) {
    const { ctx, w, h, option } = this;
    ctx.strokeStyle = "rgba(210, 230, 245, 0.22)";
    ctx.lineWidth = 1;
    this.rain.forEach((drop) => {
      const x = ((drop.x + t * 0.04) % 1) * w;
      const y = ((drop.y + t * drop.v) % 1) * h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 3, y + drop.len);
      ctx.stroke();
    });
    this.beads.forEach((bead, i) => {
      const y = bead.y * h + Math.sin(t * 0.15 + i) * 2;
      ctx.fillStyle = "rgba(200, 230, 255, 0.28)";
      ctx.beginPath();
      ctx.ellipse(bead.x * w, y, bead.r * 0.7, bead.r, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    this.drawWaterBands(t, option.waterY, "rgba(180, 220, 230, 0.05)");
  }

  drawPollen(t) {
    this.drawMotes(t, 0.2, true);
    this.petals.forEach((petal, i) => {
      this.drawPetal(petal, t, i, "rgba(255, 210, 180, 0.35)");
    });
  }

  drawPetals(t) {
    const { option } = this;
    this.petals.forEach((petal, i) => {
      this.drawPetal(petal, t, i, i % 2 ? "rgba(210, 70, 50, 0.38)" : "rgba(230, 120, 40, 0.32)");
    });
    this.drawWaterBands(t, option.waterY, "rgba(80, 140, 110, 0.06)");
    this.drawMotes(t, 0.1);
  }

  drawLantern(t) {
    const { ctx, w, h } = this;
    const pulse = 0.05 + Math.sin(t * 0.9) * 0.015;
    ctx.fillStyle = `rgba(255, 170, 70, ${pulse})`;
    ctx.fillRect(0, 0, w, h);
    this.drawFireflyField(t, 0.55);
    this.drawMotes(t, 0.08);
  }

  drawGroundFog(t) {
    const { ctx, w, h, option } = this;
    this.fog.forEach((bank, i) => {
      const x = ((bank.x + t * bank.v * 0.7) % 1.5) * w - w * 0.2;
      const y = h * option.fogY + Math.sin(t * 0.15 + i) * 8;
      const g = ctx.createRadialGradient(x, y, 8, x, y, w * 0.38);
      g.addColorStop(0, "rgba(255, 245, 235, 0.14)");
      g.addColorStop(1, "rgba(255, 245, 235, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.38, h * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    this.drawMotes(t, 0.16, true);
  }

  drawHeat(t) {
    const { ctx, w, h } = this;
    ctx.fillStyle = `rgba(255, 220, 140, ${0.03 + Math.sin(t * 0.3) * 0.01})`;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let i = 0; i < 5; i += 1) {
      const y = h * 0.35 + i * 18 + Math.sin(t * 0.6 + i) * 4;
      ctx.beginPath();
      ctx.ellipse(w * 0.5, y, w * 0.5, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    this.drawMotes(t, 0.18, true);
  }

  drawFireflies(t) {
    const { ctx, w, h, option } = this;
    this.fog.forEach((bank, i) => {
      const x = ((bank.x + t * 0.003) % 1.4) * w - w * 0.2;
      const y = h * option.fogY + Math.sin(t * 0.12 + i) * 6;
      const g = ctx.createRadialGradient(x, y, 4, x, y, w * 0.3);
      g.addColorStop(0, "rgba(255, 250, 230, 0.08)");
      g.addColorStop(1, "rgba(255, 250, 230, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.3, h * 0.07, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    this.drawFireflyField(t, 0.85);
  }

  drawFireflyField(t, scale) {
    const { ctx, w, h } = this;
    this.fireflies.forEach((bug, i) => {
      const x = ((bug.x + Math.sin(t * bug.v + i) * 0.04) % 1) * w;
      const y = ((bug.y + Math.cos(t * bug.v * 0.8 + i) * 0.03) % 1) * h * scale + h * (1 - scale) * 0.15;
      const a = 0.15 + Math.max(0, Math.sin(t * bug.pulse + i)) * 0.7;
      const g = ctx.createRadialGradient(x, y, 0, x, y, bug.r * 7);
      g.addColorStop(0, `rgba(255, 230, 120, ${a})`);
      g.addColorStop(1, "rgba(255, 200, 60, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, bug.r * 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 250, 180, ${a})`;
      ctx.beginPath();
      ctx.arc(x, y, bug.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawMotes(t, alpha, pollen = false) {
    const { ctx, w, h } = this;
    this.motes.forEach((m, i) => {
      const x = ((m.x + t * m.v) % 1) * w;
      const y = ((m.y + Math.sin(t * m.drift + i) * 0.03 + (pollen ? t * 0.004 : 0) + 1) % 1) * h;
      ctx.fillStyle = `rgba(255,255,255,${alpha + Math.sin(t + i) * 0.06})`;
      ctx.beginPath();
      ctx.arc(x, y, m.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawWaterBands(t, waterY, color) {
    const { ctx, w, h } = this;
    const y0 = h * waterY;
    ctx.fillStyle = color;
    for (let i = 0; i < 7; i += 1) {
      const y = y0 + i * 12 + Math.sin(t * 0.45 + i) * 4;
      ctx.beginPath();
      ctx.ellipse(w * 0.5, y, w * 0.48, 11, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawSparkles(t, waterY, span) {
    const { ctx, w, h } = this;
    this.sparkles.forEach((s, i) => {
      const phase = (s.life + t * 0.15) % 1;
      if (phase > 0.35) return;
      const a = Math.sin(phase * Math.PI) * 0.55;
      ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
      ctx.beginPath();
      ctx.arc(((s.x + t * 0.01) % 1) * w, h * waterY + s.y * h * 0.2 * span, 1.3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawPetal(petal, t, i, color) {
    const { ctx, w, h } = this;
    const x = ((petal.x + Math.sin(t * 0.3 + i) * 0.08) % 1) * w;
    const y = ((petal.y + t * petal.v) % 1) * h;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t * petal.spin + i);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, petal.s, petal.s * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

window.SCENES = SCENES;
window.AmbientView = AmbientView;
window.optionOf = optionOf;
