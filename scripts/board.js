class Cell {
    constructor({ x, y }) {
        this.piece = null
        this.occupied = false
        this.position = {
            x: 0,
            y: 0,
        }
    }
    toggleOccupied() {
        this.occupied = !this.occupied
    }
    draw(ctx) {
        const width = ctx.canvas.width
        const height = ctx.canvas.height
        ctx.beginPath()
        if (this.position.x % 2 == 0 && this.position.y % 2 == 0) {
            ctx.fillStyle = "white"
        } else {
            ctx.fillStyle = "black"
        }
        ctx.fillRect(this.position.x, this.position.y, width / 8, height / 8)
    }
}

class Board {
    constructor() {
        this.squares = new Array(8).fill(null).map((e, i) =>
            new Array(8).fill(null).map(
                (k, j) =>
                    new Cell({
                        x: i,
                        y: j,
                    })
            )
        )
    }
    draw(ctx) {
        const width = ctx.canvas.width
        const height = ctx.canvas.height

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ctx.beginPath()
                if ((i + j) % 2 == 0) {
                    ctx.fillStyle = "white"
                } else {
                    ctx.fillStyle = "black"
                }
                ctx.fillRect(
                    (i * width) / 8,
                    (j * height) / 8,
                    width / 8,
                    height / 8
                )
            }
        }
        line(ctx, 0, 0, width, 0)
        line(ctx, 0, 0, 0, height)
        line(ctx, width, 0, 0, height)
        line(ctx, 0, height, width, 0)
    }
    update() {}
}
