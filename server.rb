#!/usr/bin/env ruby
require 'rubygems'
require 'sinatra'

set :bind, '0.0.0.0'
set :root, File.dirname(__FILE__)
set :public_folder, File.dirname(__FILE__)
