class Api::V1::FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @favorites = Favorite.all
    render json: @favorites
  end

  def create
    @favorite = Favorite.new(favorite_params)
    if @favorite.save
      render json: @favorite
    else
      render json: @favorite.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:url, :description, :unsplash_id)
  end
end
