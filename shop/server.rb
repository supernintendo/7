require 'rubygems'
require 'sinatra'

configure do
  set :port, 9252
  set :server, 'thin'
end

get '/' do
  File.read(File.join('public', 'index.html'))
end
