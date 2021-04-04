require "rails_helper"

RSpec.describe Unsplash, "#search" do
  context "successful search" do
    it "returns images via the Unsplash API" do
      # ARRANGE
      # Define params
      search_text = "test"
      client_id = Rails.application.credentials.unsplash_access_key

      # Stub HTTP call to return fake response
      fake_response = { results: [
        {
          id: "uHSiDTptzV4",
          description: "Gränsfors Bruk",
          alt_description: "person holding brown handheld tool",
          urls: {
            regular: "https://images.unsplash.com/photo-1528918230037-b8e9a8d403f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjAwMDJ8MHwxfHNlYXJjaHwxfHxzbWl0aHxlbnwwfHx8fDE2MTczOTMxODI&ixlib=rb-1.2.1&q=80&w=1080",
          },
        },
      ] }

      stub_request(:get, "http://api.unsplash.com/search/photos?client_id=#{client_id}&per_page=100&query=#{search_text}").
        to_return(
        body: fake_response.to_json,
        headers: {
          "Content-Type" => "application/json",
        },
      )

      # ACT
      # Perform search
      images = JSON.parse(Unsplash.new(search_text).search)

      # ASSERT that response equals fake response (checking the id of both)
      response_id = images["results"][0]["id"]
      fake_response_id = fake_response[:results][0][:id]
      expect(response_id).to eq(fake_response_id)
    end
  end

  # TODO: Write test for error handling
  # context "unsuccessful search" do
  # end
end
