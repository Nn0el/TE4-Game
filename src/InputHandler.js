export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0
this.sound = new Audio 
    this.sound.src = 'Fruit collect 1.wav'
    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        
        this.game.keys.push(event.key)
      }

      if (event.key === '   ') {
this.sound.play();
        this.game.player.shoot(this.mouseX, this.mouseY)
      }

      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }
    })

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', (event) => {
      this.sound.play();
      this.game.player.shoot(this.mouseX, this.mouseY)
    })
  }
}
