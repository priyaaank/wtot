require 'rest_client'

module Zomatized
  
  BASE_URI = "https://api.zomato.com/v1/"
  AUTH_HEADER = "X-Zomato-API-Key"
  TOKEN = ENV['AUTH_TOKEN']

  def get
    RestClient.get url, base_headers
  end

  private

  def base_headers
    {AUTH_HEADER => TOKEN}
  end

  def url
    resource_uri = "#{BASE_URI}#{service_uri}"
    query_string_hash.nil? ? resource_uri : uri_with_query_string(resource_uri)
  end

  def uri_with_query_string(resource_uri)
    resource_uri+"?"+stringified_query_params
  end
  
  def stringified_query_params
    query_string_hash.inject("") do | query_string, (name, value) |
      query_string = query_string + "#{name.to_s}=#{value.to_s}&"
      query_string
    end.chomp("&")
  end

end
