class SpaSoundscape {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.bedGain = null;
    this.bowlGain = null;
    this.sceneGain = null;
    this.tracks = [
      {
        title: "Rest Now",
        artist: "Eugenio Mininni",
        src: "https://assets.mixkit.co/music/584/584.mp3",
      },
      {
        title: "Smooth Meditation",
        artist: "Arulo",
        src: "https://assets.mixkit.co/music/324/324.mp3",
      },
    ];
    this.trackIndex = 0;
    this.audio = new Audio();
    this.audio.loop = false;
    this.audio.preload = "auto";
    this.audio.crossOrigin = "anonymous";
    this.mediaSource = null;
    this.bowlTimer = 0;
    this.usingMusic = false;
    this.started = false;
    this.muted = false;
    this.volume = 0.72;
    this.scene = "spa";
    this.noiseBuffer = null;
    this._onTrackEnded = () => this.nextTrack();
  }

  async start() {
    if (this.started) {
      if (this.ctx.state === "suspended") await this.ctx.resume();
      this.setMuted(false);
      return;
    }

    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = this.ctx.createGain();
    this.musicGain = this.ctx.createGain();
    this.bedGain = this.ctx.createGain();
    this.bowlGain = this.ctx.createGain();
    this.sceneGain = this.ctx.createGain();

    this.master.gain.value = this.volume;
    this.musicGain.gain.value = 0.82;
    this.bedGain.gain.value = 0.22;
    this.bowlGain.gain.value = 0.18;
    this.sceneGain.gain.value = 0.16;

    this.musicGain.connect(this.master);
    this.bedGain.connect(this.master);
    this.bowlGain.connect(this.master);
    this.sceneGain.connect(this.master);
    this.master.connect(this.ctx.destination);

    this.noiseBuffer = this._makeNoise(this.ctx);
    this._buildPad();
    this._buildWater();
    this._buildWind();
    this._scheduleBowls();
    this._connectMusic();
    this.setScene(this.scene);
    this.started = true;

    this.audio.addEventListener("ended", this._onTrackEnded);
    this.audio.addEventListener("error", () => {
      this.usingMusic = false;
      this._liftBed();
      this.nextTrack();
    });
    this.playTrack(0);
    await this.ctx.resume();
  }

  _connectMusic() {
    try {
      this.mediaSource = this.ctx.createMediaElementSource(this.audio);
      this.mediaSource.connect(this.musicGain);
    } catch (err) {
      this.usingMusic = false;
    }
  }

  _makeNoise(ctx) {
    const length = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    return buffer;
  }

  _noiseNode() {
    const node = this.ctx.createBufferSource();
    node.buffer = this.noiseBuffer;
    node.loop = true;
    node.start();
    return node;
  }

  _buildPad() {
    const freqs = [146.83, 174.61, 220.0, 293.66, 349.23];
    freqs.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      osc.type = "sine";
      osc2.type = index % 2 ? "triangle" : "sine";
      osc.frequency.value = freq;
      osc2.frequency.value = freq;
      osc.detune.value = -5 + index;
      osc2.detune.value = 6 - index;
      gain.gain.value = 0.045;
      lfo.frequency.value = 0.05 + index * 0.015;
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.bedGain);
      osc.start();
      osc2.start();
      lfo.start();
    });
  }

  _buildWater() {
    const source = this._noiseNode();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    filter.type = "bandpass";
    filter.frequency.value = 620;
    filter.Q.value = 0.7;
    gain.gain.value = 0.55;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sceneGain);
    this.waterGain = gain;
    this.waterFilter = filter;
  }

  _buildWind() {
    const source = this._noiseNode();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    filter.type = "lowpass";
    filter.frequency.value = 340;
    gain.gain.value = 0.28;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sceneGain);
    this.windGain = gain;
  }

  _scheduleBowls() {
    const strike = () => {
      if (!this.started || this.muted) return;
      const notes = [392.0, 440.0, 523.25, 587.33, 659.25];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = "sine";
      osc2.type = "sine";
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 2.01;
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.22, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 6.5);
      filter.type = "lowpass";
      filter.frequency.value = 1800;
      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.bowlGain);
      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 7);
      osc2.stop(this.ctx.currentTime + 7);
    };

    const loop = () => {
      strike();
      this.bowlTimer = window.setTimeout(loop, 7000 + Math.random() * 9000);
    };
    loop();
  }

  _liftBed() {
    if (!this.bedGain) return;
    this.bedGain.gain.linearRampToValueAtTime(0.42, this.ctx.currentTime + 1.2);
    this.bowlGain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 1.2);
  }

  playTrack(index) {
    this.trackIndex = (index + this.tracks.length) % this.tracks.length;
    const track = this.tracks[this.trackIndex];
    this.audio.src = track.src;
    const play = this.audio.play();
    if (play) {
      play
        .then(() => {
          this.usingMusic = true;
        })
        .catch(() => {
          this.usingMusic = false;
          this._liftBed();
        });
    }
    return track;
  }

  nextTrack() {
    return this.playTrack(this.trackIndex + 1);
  }

  currentTrack() {
    return this.tracks[this.trackIndex];
  }

  setVolume(value) {
    this.volume = Math.min(1, Math.max(0, value));
    if (this.master) this.master.gain.value = this.muted ? 0 : this.volume;
    this.audio.volume = 1;
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.value = muted ? 0 : this.volume;
    if (!muted && this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  async pause() {
    this.audio.pause();
    if (this.ctx && this.ctx.state === "running") {
      await this.ctx.suspend();
    }
  }

  async resume() {
    if (!this.started) {
      await this.start();
      return;
    }
    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    if (this.usingMusic && this.audio.paused) {
      this.audio.play().catch(() => {
        this.usingMusic = false;
        this._liftBed();
      });
    }
  }

  setScene(scene) {
    this.scene = scene;
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const water = { mountains: 0.18, spa: 0.7, garden: 0.22, meadow: 0.12 }[scene] ?? 0.3;
    const wind = { mountains: 0.55, spa: 0.08, garden: 0.22, meadow: 0.4 }[scene] ?? 0.2;
    this.waterGain.gain.linearRampToValueAtTime(water, now + 1.1);
    this.windGain.gain.linearRampToValueAtTime(wind, now + 1.1);
    this.waterFilter.frequency.linearRampToValueAtTime(scene === "spa" ? 720 : 480, now + 1.1);
  }

  statusText() {
    if (this.muted) return "Sound resting";
    if (this.usingMusic) {
      const track = this.currentTrack();
      return `${track.title} · ${track.artist}`;
    }
    return "Live spa bed";
  }
}

window.SpaSoundscape = SpaSoundscape;
