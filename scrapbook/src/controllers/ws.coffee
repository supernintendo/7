Authkey = require('models/authkey')
Draggable = require('./draggable')
WsMessage = require('models/wsmessage')
WsState = require('models/wsstate')

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

    if parsed.action == 'index' or parsed.action == 'update'
      for id, attributes of parsed.entities
        existing = valid[attributes.type].find(id)

        if existing
          existing.updateAttributes(attributes)
        else if valid[attributes.type]
          instance = attributes
          instance.id = id
          valid[attributes.type].create(instance)
    else if parsed.action == 'delete'
      existing = valid[parsed.type].find(parsed.id)

      if existing
        existing.destroy()
    else if parsed.action == 'auth'
      Authkey.first().updateAttributes(parsed)

  disconnected: ->
    @state.updateAttribute('status', 'disconnected')

  receive: (message) ->
    try
      parsed = JSON.parse(message.data)
    catch e
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
      authkey: Authkey.first().key
      target: message.target
      value: message.value
    @ws.send JSON.stringify(packet)

module.exports = Ws
