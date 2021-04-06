class Api::V1::ImagesController < ApplicationController
  def search
    @images = Unsplash.new((params[:search_text])).search
    if @images.nil?
      render json: { error: "Something went wrong. Please try again." }, status: :internal_server_error
    else
      render json: @images, status: :ok
    end
  end
end
