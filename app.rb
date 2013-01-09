require 'rubygems'
require 'sinatra'

heroku_env = File.join('./.heroku_env.rb')
load(heroku_env) if File.exists?(heroku_env)

configure do
  set :public_folder, Proc.new { File.join(root, "static") }
end

get '/' do
  erb :home
end

