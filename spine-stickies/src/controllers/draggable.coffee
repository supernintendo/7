PacketSpec = require('mixins/packetspec')
WsMessage = require('models/wsmessage')

class Draggable extends Spine.Controller
  @include PacketSpec
  className: 'draggable'
  constructor: ->
    super

  render: ->
    type = @entity.constructor.className
    template = require('views/graphic') if type == "Graphic"
    template = require('views/note') if type == "Note"
    @el = @html template(entity: @entity)
    @make_draggable @el
    @listenTo(@entity, 'update', @proxy(@redraw))
    @el

  dragend: (event) ->
    target = $ event.currentTarget
    new_pos =
      x: parseFloat(target.css 'left')
      y: parseFloat(target.css 'top')

    @entity.updateAttributes new_pos
    request = @requestUpdateObject @entity
    WsMessage.create(request)

  make_draggable: (el) ->
    el.draggabilly({})
    el.css
      left: @entity.x
      top: @entity.y
    el.on('dragEnd', @proxy(@dragend))

  redraw: ->
    new_pos = 
      left: @entity.x
      top: @entity.y

    @el.stop
    @el.animate new_pos, 200

module.exports = Draggable