require_relative 'zomatized'
require_relative 'location'

class Restaurants
  
  include Zomatized

  module Services
    NEARBY_SEARCH     = "search.json/near"
    RESTAURANT_DETAIL = "restaurant.json/"
  end
  HUNDRED_KMS = 100000

  def initialize(resource_uri, query_params = nil)
    @resource_uri = resource_uri
    @query_string_params = query_params
  end

  def self.for_location(location, radius = HUNDRED_KMS)
    Restaurants.new(Services::NEARBY_SEARCH,{
      :lat => location.latitude, 
      :lon => location.longitude,
      :radius => radius
    })
  end

  def self.by_id(id)
    return nil if id.nil?
    Restaurants.new("#{Services::RESTAURANT_DETAIL}#{id}")
  end

  def fetch
    puts get
  end

  private

  def service_uri
    @resource_uri
  end

  def query_string_hash
    @query_string_params
  end

end
