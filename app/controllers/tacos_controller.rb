class TacosController < ApplicationController

  def index
    @tacos = Taco.ordered

    return render json: @tacos
  end

  def create
    @taco = Taco.new(create_params)
    @taco.save!

    render json: @taco
  end

  def destroy
    @taco = Taco.find_by!(id: params[:id])
    @taco.destroy!

    head :no_content
  end

  private

  def create_params
    params.fetch(:taco).permit(:meat, :rice, :salsa, :notes)
  end
end
