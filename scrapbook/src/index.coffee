require('lib/setup')

Spine = require('spine')
Authkey = require('./models/authkey')
Board = require('./controllers/board')

class App extends Spine.Controller
  constructor: ->
    super
    Authkey.create()
    @html require("views/index")()
    board = new Board(objects: [])
    @append(board.render())

module.exports = App
