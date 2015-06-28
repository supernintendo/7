require 'rubygems'
require 'json'
require 'sinatra'
require 'sinatra-websocket'
require 'securerandom'

# *slurp*
Dir['./lib/*.rb'].each do |file|
  require file
end

configure do
  # Connection stuff
  set :port, 9251
  set :server, 'thin'

  # Server state
  set :entities, {}
  set :sockets, []
  set :valid_entities, ['BoardGraphic', 'BoardNote']
end

# Accept socket connections.
get '/' do
  if !request.websocket?
    'Hello'
  else
    request.websocket do |ws|
      # Client joins
      ws.onopen do
        ws.send("Hello World!")
        settings.sockets << ws
        send_to_all(all_entities)
      end

      # Message received
      ws.onmessage do |message|
        response = deal_with(message)
        send_to_all(response)
      end

      # Client leaves
      ws.onclose do
        settings.sockets.delete(ws)
      end
    end
  end
end

helpers do
  def all_entities
    # Respond with all entities
    settings.entities.map{ | key, entity|
      [key, entity.serialize]
    }.to_h.to_json
  end

  def create_entity(class_name)
    if settings.valid_entities.include?(class_name)
      klass = Object.const_get(class_name)
      settings.entities[SecureRandom.hex(4)] = klass.new
      all_entities
    else
      "class_does_not_exist"
    end
  end

  # Handle an incoming message
  def deal_with(message)
    parsed = JSON.parse(message)

    if message_is_valid?(parsed)
      action = parsed['action']
      target = parsed['target']

      if target == 'board'
        create_entity(parsed['value']) if action == 'create'
      elsif settings.entities.has_key?(target)
        update_entity(target, parsed['value']) if action == 'update'
      end
    else
      "bad_message"
    end
  end

  # Validate an incoming message
  def message_is_valid?(message)
    message['action'] and
    message['target'] and
    ['create', 'update', 'destroy'].include? message['action'] and
    (message['target'] == 'board' or settings.entities.keys.include? message['target'])
  end

  # Send a message to all clients
  def send_to_all(message)
    if message
      EM.next_tick do
        settings.sockets.each{ |s|
          s.send(message)
        }
      end
    end
  end

  def respond_with_entity(entity, id)
    response = {}
    response[id] = entity.serialize
    response.to_h.to_json
  end

  def update_entity(id, attributes)
    puts "updated #{id} #{attributes}"
    changes = attributes
    changes.delete 'id'
    target = settings.entities[id]

    changes.each do |key, value|
      if target.class.instance_methods.include? key.to_sym
        target.send("#{key}=", value)
      end
    end
    respond_with_entity(target, id)
  end
end
