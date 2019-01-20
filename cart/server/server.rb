#!/usr/bin/env ruby
require 'rubygems'
require 'sinatra'

configure do
  set :port, 7772
end

get '/' do
  File.read(File.join('public', 'index.html'))
end
