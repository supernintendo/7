Draggable = require('./draggable')
WsMessage = require('models/wsmessage')
WsState = require('/models/wsstate')

class Ws extends Spine.Controller
  constructor: ->
    @state = new WsState({ status: 'loading' })
    @listenTo WsMessage, 'create', @proxy(@send)
    @newWebsocket()
    super

  connected: ->
    @state.updateAttribute('status', 'connected')

  deal_with: (parsed) ->
    valid =
      BoardGraphic: require('models/graphic')
      BoardNote: require('models/note')

    for id, attributes of parsed
      existing = valid[attributes.type].find(id)

      if existing
        existing.updateAttributes(attributes)
      else if valid[attributes.type]
        instance = attributes
        instance.id = id
        valid[attributes.type].create(instance)

  disconnected: ->
    @state.updateAttribute('status', 'disconnected')

  receive: (message) ->
    try
      parsed = JSON.parse(message.data)
    catch e
      @log message
    finally
      @deal_with parsed if parsed

  newWebsocket: ->
    @ws = new WebSocket('ws://localhost:9251/')
    @ws.onopen = @proxy(@connected)
    @ws.onclose = @proxy(@disconnected)
    @ws.onmessage = @proxy(@receive)

  send: (message) ->
    packet =
      action: message.action
      target: message.target_id
      value: message.value
    @ws.send JSON.stringify(packet)

module.exports = Ws