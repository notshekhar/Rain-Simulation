function Spark({ position, radius, drop }) {
    this.position = position
    this.velocity = vector(0, 0)
    this.acceleration = vector(
        getRandomValue(-0.2, 0.2),
        getRandomValue(-0.1, -0.2)
    ) // make it random

    this.radius = radius

    this.drop = drop

    this.crashed = true

    this.draw = function (ctx) {
        if (this.crashed) return
        ctx.beginPath()
        ctx.fillStyle = "rgba(0, 0, 255, 0.2)"
        ctx.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2)
        ctx.fill()
    }
    this.update = function (ctx) {
        if (this.crashed) return
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        if (this.position.y > ctx.canvas.height + 20) {
            this.crashed = true
            this.onCrash()
        }
    }
    this.start = function ({ position }) {
        this.position = position.copy()
        this.velocity = vector(getRandomValue(-0.7, 0.7), getRandomValue(0, -3))
        this.acceleration = vector(0, 0.1) // make it random
        this.crashed = false
    }
    this.onCrash = function () {
        this.drop.onSparkCrash(this)
    }
}

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min
}
