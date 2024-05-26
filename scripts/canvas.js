function line(ctx, x, y, dx, dy) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + dx, y + dy)

    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.stroke()
}

function clearCanvas(ctx) {
    ctx.fillStyle = "rgba(255, 255,255, 0.5)"
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fill()
}
