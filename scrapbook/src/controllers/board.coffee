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
    '.draggables': 'draggables',
    '.ctrl-add': 'addButtons',

  events:
    'click .ctrl-add-graphic': 'newGraphic',
    'click .ctrl-add-note': 'newNote',
    'click .ctrl-edit': 'startEditing',
    'click .ctrl-reconnect': 'reconnect'
    'click .graphic': 'graphicClicked',
    'click .note': 'noteClicked',

  constructor: ->
    @editing = false
    @ws = new Ws()
    @addListeners()
    super

  addListeners: ->
    @listenTo Graphic, 'create', @proxy(@addObject)
    @listenTo Note, 'create', @proxy(@addObject)
    @listenTo WsState, 'create update', @proxy(@render)

  render: ->
    if WsState.last()
      @html require('views/board')({ status: WsState.last().status })
    else
      @html require('views/board')({ status: 'loading' })

  addObject: (entity) ->
    newObject = new Draggable(entity: entity)
    @objects.push newObject
    @draggables.append newObject.el

    if @editing
      @disableDragging()

  disableDragging: ->
    @addButtons.hide()
    for element in @draggables.children()
      $(element).draggabilly 'disable'
      $(element).addClass 'disabled'

  enableDragging: ->
    @addButtons.show()
    for element in @draggables.children()
      $(element).draggabilly 'enable'
      $(element).removeClass 'disabled'

  graphicClicked: (event) ->
    if @editing
      graphic = Graphic.find $(event.currentTarget).data('id')
      value = prompt "enter the url of an image to be displayed", $(event.currentTarget).text()

      if value
        graphic.updateAttribute "image", value
        graphic.trigger "persist"

  newGraphic: (event) ->
    request = @requestNewObject 'BoardGraphic'
    WsMessage.create request

  newNote: (event) ->
    request = @requestNewObject 'BoardNote'
    WsMessage.create request

  noteClicked: (event) ->
    if @editing
      note = Note.find $(event.currentTarget).data('id')
      value = prompt "enter some text to be displayed", $(event.currentTarget).text()

      if value
        note.updateAttribute "text", value
        note.trigger "persist"

  reconnect: (event) ->
    @ws = new Ws()

  startEditing: ->
    @editing = !@editing
    if @editing
      @disableDragging()
    else
      @enableDragging()

module.exports = Board
