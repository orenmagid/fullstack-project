class Unsplash
  include HTTParty
  base_uri "api.unsplash.com/"

  # Initialize Unsplash Service Object
  def initialize(search_text)
    @search_text = search_text
    @client_id = Rails.application.credentials.unsplash_access_key
  end

  # Search Unsplash API
  def search
    url = "/search/photos?query=#{@search_text}&per_page=100&client_id=#{@client_id}"
    self.class.get(url).body
  rescue StandardError => e
    puts "The application encountered the following error while attempting to search the Unsplash API: #{e}"
  end
end
