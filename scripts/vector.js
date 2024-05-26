function vector(x, y) {
    return new V(x, y)
}
function V(x, y) {
    this.x = x
    this.y = y
    this.add = function (v) {
        this.x += v.x
        this.y += v.y
    }
    this.subtract = function (v) {
        this.x -= v.x
        this.y -= v.y
    }
    this.multiply = function (n) {
        this.x *= n
        this.y *= n
    }
    this.dot = function (v) {
        return this.x * v.x + this.y * v.y
    }
    this.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    this.angle = function (v) {
        return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()))
    }
    this.copy = function () {
        return new V(this.x, this.y)
    }
}
