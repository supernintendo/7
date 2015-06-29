PacketSpec = require('mixins/packetspec')
WsMessage = require('models/wsmessage')

class Draggable extends Spine.Controller
  @include PacketSpec
  className: 'draggable'
  constructor: ->
    super
    @render()
    @make_draggable @el
    @addListeners()

  events:
    'click .delete': 'delete'

  render: ->
    type = @entity.constructor.className
    template = require('views/graphic') if type == 'Graphic'
    template = require('views/note') if type == 'Note'
    @el = @html template(entity: @entity)

  addListeners: ->
    @listenTo(@entity, 'destroy', @proxy(@release))
    @listenTo(@entity, 'persist', @proxy(@persist))
    @listenTo(@entity, 'update', @proxy(@redraw))

  delete: ->
    request = @requestDeleteObject @entity.id
    WsMessage.create request

  dragend: (event) ->
    target = $ event.currentTarget
    new_pos =
      x: parseFloat(target.css 'left')
      y: parseFloat(target.css 'top')
    @entity.updateAttributes new_pos
    @entity.trigger 'persist'

  make_draggable: (el) ->
    el.draggabilly({})
    el.css
      left: @entity.x
      top: @entity.y
    el.on('dragEnd', @proxy(@dragend))

  persist: ->
    request = @requestUpdateObject @entity
    WsMessage.create request

  redraw: ->
    @render()
    new_pos = 
      left: @entity.x
      top: @entity.y

    @el.stop
    @el.animate new_pos, 200

module.exports = Draggable
