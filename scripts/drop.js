function Drop({ position, velocity, radius, rain, cooldown }) {
    this.startingPosition = vector(position.x, position.y)
    this.initialForce = vector(0, 0)

    this.position = vector(position.x, position.y)
    this.velocity = vector(velocity.x, velocity.y)
    this.forces = vector(0, 0)
    this.rain = rain
    this.cooldown = cooldown

    this.sparks = new Array(10).fill(null).map((_, index) => {
        return new Spark({
            position: this.position.copy(),
            radius: 1,
            drop: this,
        })
    })

    this.draw = function (ctx) {
        if (this.crashed) return
        this.sparks.forEach((spark) => {
            spark.draw(ctx)
        })
        ctx.beginPath()
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)"
        ctx.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2)
        ctx.fill()
    }
    this.onCrash = function () {
        // start the rain drop destroy effect
        this.rain.onDropCrash(this)
    }
    this.update = function (ctx) {
        this.sparks.forEach((spark) => {
            spark.update(ctx)
        })
        if (this.cooldown > 0) {
            this.cooldown--
            return
        }
        if (this.crashed) return
        if (this.position.y > ctx.canvas.height) {
            this.onCrash()
        }
        this.position.add(this.velocity)
        this.velocity.add(this.forces)
        this.angle = this.velocity.angle(vector(0, 0))
    }
    this.setInitialForce = function (force) {
        this.initialForce = force.copy()
    }
    this.addForce = function (force) {
        this.forces.add(force)
    }
    this.startSparkAnimation = function () {
        this.sparks.forEach((spark) => {
            spark.start({
                position: this.position.copy(),
            })
        })
    }
    this.reset = function ({ position }) {
        this.startSparkAnimation()
        this.position = position.copy()
        this.velocity = vector(0, 0)
        this.forces = this.initialForce.copy()
        this.crashed = false
        this.cooldown = Math.floor(Math.random() * 500)
    }
    this.onSparkCrash = function (spark) {
        // console.log(spark)
    }
}
