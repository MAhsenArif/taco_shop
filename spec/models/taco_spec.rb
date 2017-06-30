require 'rails_helper'

RSpec.describe Taco, type: :model do

  let(:taco) { build(:taco) }

  it 'is valid taco order' do
    expect(taco).to be_valid
  end

  it 'is invalid order without meat' do
    taco.meat = nil
    expect(taco).not_to be_valid
    expect(taco.errors).to have_key(:meat)
  end

  it 'is invalid taco with meat length greater than 30' do
    taco.meat = 'A very large string is set here.'
    expect(taco).not_to be_valid
  end
end
