import Enemy from './Enemy'
import SpellBook from './assets/Icons.png'
export default class Candy extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.type = 'candy'

    this.fps = 10
    this.timer = 1
    this.interval = 250 / this.fps
    this.flip = false



    const image = new Image()
    image.src = SpellBook
    this.image = image
    this.frameX = 0
    this.frameY = 13
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
