Authkey = require('models/authkey')
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
    '.authkey': 'authkeyInput'
    '.draggables': 'draggables',
    '.ctrl-add': 'addButtons',
    '.needs-auth': 'needsAuth',

  events:
    'click .ctrl-add-graphic': 'newGraphic',
    'click .ctrl-add-note': 'newNote',
    'click .ctrl-edit': 'toggleEditing',
    'click .ctrl-reconnect': 'reconnect'
    'click .graphic': 'graphicClicked',
    'click .note': 'noteClicked',
    'keyup .authkey': 'authkeyChanged',

  constructor: ->
    @editing = false
    @ws = new Ws()
    @addListeners()
    super

  addListeners: ->
    @listenTo Authkey, 'update', @proxy(@updateAuthDisplay)
    @listenTo Graphic, 'create', @proxy(@addObject)
    @listenTo Note, 'create', @proxy(@addObject)
    @listenTo WsState, 'create update', @proxy(@render)

  authkeyChanged: ->
    Authkey.first().updateAttribute 'key', @authkeyInput.val()
    request = @requestCheckAuthKey Authkey.first().key
    WsMessage.create request

  render: ->
    if WsState.last()
      @html require('views/board')({ status: WsState.last().status })
      @updateAuthDisplay()
    else
      @html require('views/board')({ status: 'loading' })

  addObject: (entity) ->
    newObject = new Draggable(entity: entity)
    @objects.push newObject
    @draggables.append newObject.el

    if @editing or not Authkey.first().valid
      @disableDragging()

  disableDragging: ->
    @addButtons.hide()
    @el.removeClass 'dragging-enabled'
    for element in @draggables.children()
      $(element).draggabilly 'disable'

  enableDragging: ->
    @el.addClass 'dragging-enabled'
    @addButtons.show()
    for element in @draggables.children()
      $(element).draggabilly 'enable'

  graphicClicked: (event) ->
    if @editing
      graphic = Graphic.find $(event.currentTarget).data('id')
      value = prompt 'enter the url of an image to be displayed', $(event.currentTarget).text()

      if value
        graphic.updateAttribute 'image', value
        graphic.trigger 'persist'

  newGraphic: (event) ->
    request = @requestNewObject 'BoardGraphic'
    WsMessage.create request

  newNote: (event) ->
    request = @requestNewObject 'BoardNote'
    WsMessage.create request

  noteClicked: (event) ->
    if @editing
      note = Note.find $(event.currentTarget).data('id')
      value = prompt 'enter some text to be displayed', $(event.currentTarget).text()

      if value
        note.updateAttribute 'text', value
        note.trigger 'persist'

  reconnect: (event) ->
    @ws = new Ws()

  toggleEditing: ->
    @editing = !@editing
    @updateEditingDisplay()

    if @editing
      @disableDragging()
    else
      @enableDragging()

  updateAuthDisplay: ->
    if Authkey.first().valid
      @enableDragging()
      @needsAuth.show()
    else
      @disableDragging()
      @editing = false
      @updateEditingDisplay()
      @needsAuth.hide()

  updateEditingDisplay: ->
    if @editing
      @el.addClass 'editing'
    else
      @el.removeClass 'editing'

module.exports = Board
