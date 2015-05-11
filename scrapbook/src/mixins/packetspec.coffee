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

module.exports = PacketSpec