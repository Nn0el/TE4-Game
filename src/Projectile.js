import Spell from './assets/01.png'
import Player from './Player'
export default class Projectile {
  constructor(game, x, y, angle) {
    this.game = game
    this.width = 66
    this.height = 68
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = 400
    this.damage = 1
    this.markedForDeletion = false

    this.fps = 10
    this.timer = 1
    this.interval = 250 / this.fps
    this.flip = false



    const image = new Image()
    image.src = Spell
    this.image = image
    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 7
  }

  update(deltaTime) {


   


    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
    const velocity = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    }

    this.x += velocity.x * (deltaTime / 1000)
    this.y += velocity.y * (deltaTime / 1000)

    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }

  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
  
  
    )
    context.restore()


    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    
    context.restore()
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }
  }
}
