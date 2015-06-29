PacketSpec =
  requestNewObject: (type) ->
    spec =
      action: 'create',
      target_id: 'board',
      value: type
    spec

  requestUpdateObject: (instance) ->
    spec = 
      action: 'update',
      target_id: instance.id
      value: instance
    spec

  requestDeleteObject: (id) ->
    spec =
      action: 'destroy',
      target_id: id
    spec

module.exports = PacketSpec
