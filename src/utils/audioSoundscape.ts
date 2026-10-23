/**
 * Procedural Botanical Ambient Soundscape Synthesizer
 * Generates organic breeze, rustling botanical leaves, and gentle harmonic dewdrops
 * using 100% procedural Web Audio API (zero external audio files or 404 risks).
 */

class BotanicalSoundscape {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private lfo: OscillatorNode | null = null;
  private chimeTimer: number | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private targetVolume: number = 0.055; // Gentle, very subtle ambient luxury level

  public async start(): Promise<void> {
    if (this.ctx && this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      // Master Gain for smooth fades
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Organic Wind & Leaf Rustling Generator (Pink/Brown noise with resonant filters)
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Paul Kellet's refined pink noise filter algorithm
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Resonant leaf rustle bandpass filter
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 420;
      bandpass.Q.value = 1.1;

      // Modulating lowpass filter to mimic rising and subsiding garden breeze
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 550;
      lowpass.Q.value = 0.7;

      // LFO for organic wind modulation (0.12 Hz cycle)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.12;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 240; // Swings frequency between ~310Hz and ~790Hz
      this.lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);

      this.noiseNode.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(this.masterGain);

      this.noiseNode.start();
      this.lfo.start();

      // 2. Faint Harmonic Garden Chimes / Dewdrop Resonance
      this.startSporadicChimes();

      // Smooth fade-in
      const now = this.ctx.currentTime;
      this.masterGain.gain.exponentialRampToValueAtTime(this.targetVolume, now + 3.0);
      this.isPlaying = true;
      this.isMuted = false;
    } catch {
      // Audio autoplay policy handled silently
    }
  }

  private startSporadicChimes(): void {
    if (!this.ctx || !this.masterGain) return;

    const playChime = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const pentatonicFrequencies = [432, 540, 648, 864, 972]; // Soft golden ratio harmonic tuning
      const freq = pentatonicFrequencies[Math.floor(Math.random() * pentatonicFrequencies.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.012, now + 0.1); // Ultra soft
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.6);

      // Schedule next chime in 5 to 11 seconds
      const nextDelay = 5000 + Math.random() * 6000;
      this.chimeTimer = window.setTimeout(playChime, nextDelay);
    };

    this.chimeTimer = window.setTimeout(playChime, 3000);
  }

  public toggleMute(): boolean {
    if (!this.ctx || !this.masterGain) {
      this.start();
      return true;
    }

    const now = this.ctx.currentTime;
    if (this.isMuted) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(this.targetVolume, now + 1.2);
      this.isMuted = false;
      return true;
    } else {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || this.targetVolume, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      this.isMuted = true;
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !this.isMuted;
  }

  public dispose(): void {
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    try {
      this.noiseNode?.stop();
      this.lfo?.stop();
      this.ctx?.close();
    } catch {
      // Ignored
    }
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
  }
}

export const ambientSoundscape = new BotanicalSoundscape();
