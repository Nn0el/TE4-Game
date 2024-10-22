import Enemy from './Enemy.js'
import EldEnemy from './assets/EldEnemy.png'
export default class Pumpkin extends Enemy {
  constructor(game, x, y, ) {
    super(game)
    this.width = 100
    this.height = 100
    this.x = x
    this.y = y
    this.speed = 2
    this.lives = Math.floor(Math.random() * 3) + 1
    this.color = 'orange'

    this.fps = 10
    this.timer = 1
    this.interval = 1 / this.fps
    this.flip = false



    const image = new Image()
    image.src = EldEnemy
    this.image = image
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 8
  }

  


  update(player, deltaTime) {
   

    if (this.timer > this.interval) {
    this.frameX++
    this.timer = 0
  } else {
    this.timer += deltaTime
  }
  if (this.frameX >= this.maxFrame) {
    this.frameX = 0
    this.frameY++
  }
  if(this.frameY>= 7){
    this.frameY=0
  }


    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis
  }
draw(context){
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
