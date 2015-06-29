PacketSpec =
  requestCheckAuthKey: (key) ->
    spec =
      action: 'auth',
      target: 'board',
      value: key
    spec

  requestNewObject: (type) ->
    spec =
      action: 'create',
      target: 'board',
      value: type
    spec

  requestUpdateObject: (instance) ->
    spec = 
      action: 'update',
      target: instance.id
      value: instance
    spec

  requestDeleteObject: (id) ->
    spec =
      action: 'destroy',
      target: id
    spec

module.exports = PacketSpec
