// Web Audio API based audio manager
// Uses programmatic audio generation for game sounds

class AudioManager {
    private audioContext: AudioContext | null = null;
    private bgmGain: GainNode | null = null;
    private sfxGain: GainNode | null = null;
    private bgmOscillators: OscillatorNode[] = [];
    private isBgmPlaying = false;

    private _soundEnabled = true;
    private _musicEnabled = true;

    get soundEnabled() { return this._soundEnabled; }
    set soundEnabled(value: boolean) {
        this._soundEnabled = value;
        if (this.sfxGain) {
            this.sfxGain.gain.setValueAtTime(value ? 0.3 : 0, this.audioContext?.currentTime || 0);
        }
    }

    get musicEnabled() { return this._musicEnabled; }
    set musicEnabled(value: boolean) {
        this._musicEnabled = value;
        if (value && !this.isBgmPlaying) {
            this.startBgm();
        } else if (!value && this.isBgmPlaying) {
            this.stopBgm();
        }
    }

    private initContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

            // Create master gain nodes
            this.bgmGain = this.audioContext.createGain();
            this.bgmGain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            this.bgmGain.connect(this.audioContext.destination);

            this.sfxGain = this.audioContext.createGain();
            this.sfxGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            this.sfxGain.connect(this.audioContext.destination);
        }

        // Resume context if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Play jump sound effect
    playJump() {
        if (!this._soundEnabled) return;
        this.initContext();
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    // Play death sound effect
    playDeath() {
        if (!this._soundEnabled) return;
        this.initContext();
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.5);

        gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.5);
    }

    // Play level complete sound
    playLevelComplete() {
        if (!this._soundEnabled) return;
        this.initContext();
        if (!this.audioContext || !this.sfxGain) return;

        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime + i * 0.15);

            gain.gain.setValueAtTime(0, this.audioContext!.currentTime);
            gain.gain.setValueAtTime(0.4, this.audioContext!.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + i * 0.15 + 0.3);

            osc.connect(gain);
            gain.connect(this.sfxGain!);

            osc.start(this.audioContext!.currentTime + i * 0.15);
            osc.stop(this.audioContext!.currentTime + i * 0.15 + 0.3);
        });
    }

    // Play button press sound
    playButtonPress() {
        if (!this._soundEnabled) return;
        this.initContext();
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
        osc.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.05);

        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    // Play bridge open/close sound
    playBridgeToggle() {
        if (!this._soundEnabled) return;
        this.initContext();
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
        osc.frequency.linearRampToValueAtTime(300, this.audioContext.currentTime + 0.15);

        gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.2);
    }

    // Start background music (looping synth arpeggio)
    startBgm() {
        if (!this._musicEnabled || this.isBgmPlaying) return;
        this.initContext();
        if (!this.audioContext || !this.bgmGain) return;

        this.isBgmPlaying = true;

        // Simple ambient pads
        const baseNotes = [130.81, 164.81, 196.00, 246.94]; // C3, E3, G3, B3

        baseNotes.forEach((freq, i) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();
            const filter = this.audioContext!.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);

            // Slow amplitude modulation for pad effect
            const now = this.audioContext!.currentTime;
            gain.gain.setValueAtTime(0.1, now);

            // Create subtle pulsing
            const lfo = this.audioContext!.createOscillator();
            const lfoGain = this.audioContext!.createGain();
            lfo.frequency.setValueAtTime(0.5 + i * 0.1, now);
            lfoGain.gain.setValueAtTime(0.05, now);
            lfo.connect(lfoGain);
            lfoGain.connect(gain.gain);
            lfo.start();

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(500, now);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.bgmGain!);

            osc.start();

            this.bgmOscillators.push(osc);
            this.bgmOscillators.push(lfo);
        });
    }

    // Stop background music
    stopBgm() {
        this.bgmOscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // Oscillator may have already stopped
            }
        });
        this.bgmOscillators = [];
        this.isBgmPlaying = false;
    }

    // Play UI click sound
    playClick() {
        if (!this._soundEnabled) return;
        this.initContext();
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, this.audioContext.currentTime);

        gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.05);
    }
}

// Singleton instance
export const audioManager = new AudioManager();
