require('lib/setup')

Spine = require('spine')
Board = require('./controllers/board')

class App extends Spine.Controller
  constructor: ->
    super
    @html require("views/index")()
    board = new Board(objects: [])
    @append(board.render())

module.exports = App
