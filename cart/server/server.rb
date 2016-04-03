#!/usr/bin/env rubyb
require 'rubygems'
require 'sinatra'

configure do
  set :port, 7772
  set :server, 'thin'
end

get '/' do
  File.read(File.join('public', 'index.html'))
end
