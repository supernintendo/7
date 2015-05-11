Draggable = require('./draggable')
Graphic = require('models/graphic')
Note = require('models/note')
PacketSpec = require('mixins/packetspec')
WsMessage = require('models/wsmessage')
WsState = require('models/wsstate')
Ws = require('./ws')

class Board extends Spine.Controller
  @include PacketSpec
  elements:
    '.draggables': 'draggables'

  events:
    'click .ctrl-add-graphic': 'newGraphic',
    'click .ctrl-add-note': 'newNote',
    'click .ctrl-reconnect': 'reconnect'

  constructor: ->
    @listenTo Graphic, 'create', @proxy(@addObject)
    @listenTo Note, 'create', @proxy(@addObject)
    @listenTo WsState, 'create update', @proxy(@render)
    @ws = new Ws()
    super

  render: ->
    @log 'render'
    if WsState.last()
      @html require('views/board')({ status: WsState.last().status })
    else
      @html require('views/board')({ status: 'loading' })

  addObject: (entity) ->
    newObject = new Draggable(entity: entity)
    @objects.push(newObject)
    @draggables.append(newObject.render())
    @log @objects

  newGraphic: (event) ->
    request = @requestNewObject 'BoardGraphic'
    WsMessage.create(request)

  newNote: (event) ->
    request = @requestNewObject 'BoardNote'
    WsMessage.create(request)

  reconnect: (event) ->
    @ws = new Ws()

module.exports = Board