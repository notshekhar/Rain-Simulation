const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const sound = new Audio("./light-rain-109591.mp3")

setTimeout(() => {
    sound.play()
}, 4000)

let rain

function setup() {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    rain = new Rain(ctx)
    rain.setup(ctx)
}

function run() {
    if (rain) rain.draw(ctx)
    if (rain.drops.length > 10000) return
    requestAnimationFrame(run)
}

setup()
requestAnimationFrame(run)

// add z axis too
