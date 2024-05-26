function Rain(ctx) {
    this.stopAnimation = false
    this.gravity = vector(0, 0.1)
    this.air = vector(0.0001, 0)
    this.ctx = ctx
    // this.controller = new Controller()

    this.drops = null

    this.setup = function () {
        const width = this.ctx.canvas.width
        const height = this.ctx.canvas.height

        this.drops = new Array(1000).fill(null).map((_, index) => {
            return new Drop({
                position: vector(getRandomValue(-width / 5, width), -1000),
                velocity: vector(0, 0),
                radius: 2,
                rain: this,
                cooldown: Math.floor(Math.random() * 1000),
            })
        })
        this.drops.forEach((drop) => {
            drop.addForce(this.gravity)
            drop.addForce(this.air)
            drop.setInitialForce(drop.forces)
        })
        clearCanvas(this.ctx)
    }
    this.draw = function () {
        clearCanvas(this.ctx)
        this.drops.forEach((drop) => {
            drop.draw(this.ctx)
            if (drop.cooldown <= 0) {
                drop.addForce(this.air)
            }
            drop.update(this.ctx)
        })
        line(this.ctx, 0, 0, this.ctx.canvas.width, 0)
        line(this.ctx, 0, 0, 0, this.ctx.canvas.height)
        line(this.ctx, this.ctx.canvas.width, 0, 0, this.ctx.canvas.height)
        line(this.ctx, 0, this.ctx.canvas.height, this.ctx.canvas.width, 0)
    }

    this.onDropCrash = function (drop) {
        const newPosition = vector(Math.random() * this.ctx.canvas.width, -1000)
        drop.reset({
            position: newPosition,
        })
        // playWaterDropSound()
    }
}
function playWaterDropSound() {
    // Create a new AudioContext
    const audioCtx = new AudioContext()

    // Define the parameters for the initial impact sound
    const impactFrequency = 800 // in Hz
    const impactDuration = 0.01 // in seconds
    const impactAmplitude = 0.8 // between 0 and 1

    // Define the parameters for the resonance sound
    const resonanceFrequencies = [200, 400, 600] // in Hz
    const resonanceAmplitudes = [0.4, 0.3, 0.2] // between 0 and 1
    const resonanceDuration = 0.5 // in seconds
    const decayTime = 0.3 // in seconds

    // Create the initial impact sound
    const impactBuffer = audioCtx.createBuffer(
        1,
        audioCtx.sampleRate * impactDuration,
        audioCtx.sampleRate
    )
    const impactData = impactBuffer.getChannelData(0)
    for (let i = 0; i < impactData.length; i++) {
        const t = i / audioCtx.sampleRate
        impactData[i] =
            impactAmplitude * Math.sin(2 * Math.PI * impactFrequency * t)
    }
    const impactSource = audioCtx.createBufferSource()
    impactSource.buffer = impactBuffer

    // Create the resonance sound
    const resonanceBuffer = audioCtx.createBuffer(
        1,
        audioCtx.sampleRate * resonanceDuration,
        audioCtx.sampleRate
    )
    const resonanceData = resonanceBuffer.getChannelData(0)
    for (let i = 0; i < resonanceData.length; i++) {
        const t = i / audioCtx.sampleRate
        let sample = 0
        for (let j = 0; j < resonanceFrequencies.length; j++) {
            const frequency = resonanceFrequencies[j]
            const amplitude = resonanceAmplitudes[j]
            sample +=
                amplitude *
                Math.sin(2 * Math.PI * frequency * t) *
                Math.exp(-decayTime * t)
        }
        resonanceData[i] = sample
    }
    const resonanceSource = audioCtx.createBufferSource()
    resonanceSource.buffer = resonanceBuffer

    // Connect the sources to the output and start playing
    impactSource.connect(audioCtx.destination)
    resonanceSource.connect(audioCtx.destination)
    impactSource.start()
    resonanceSource.start()
}
