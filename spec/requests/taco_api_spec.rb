require 'rails_helper'

describe 'Tacos' do
    let!(:taco) { create :taco }

    describe 'GET /tacos' do
      context 'no taco orders available' do
        before(:each) do
          Taco.destroy_all

          get '/tacos', headers: request_headers
        end

        it 'responds with 200 status' do
          expect(response.status).to eql(200)
        end

        it 'responds with empty object' do
          expect(json['data']).to be_blank
        end
      end

      context 'taco orders available' do
        let!(:second_taco) { create(:taco) }

        before(:each) do
          get '/tacos'
        end

        it 'responds with 200 status' do
          expect(response.status).to eql(200)
        end

        it 'responds with taco orders data' do
          expect(json['data'].first['attributes']).to include(
            {
              'meat' => taco.meat,
              'rice' => taco.rice,
              'salsa' => taco.salsa
            }
          )

          expect(json['data'].last['attributes']).to include(
            {
              'meat' => second_taco.meat,
              'rice' => second_taco.rice,
              'salsa' => second_taco.salsa
            }
          )
        end
      end
    end

    describe 'POST /tacos' do
      let!(:taco_attributes) { attributes_for(:taco) }
      let!(:data) {
        {
          'taco' =>
          {
            'meat': 'steak',
            'rice': false,
            'salsa': true,
            'notes': 'Cooked medium rare'
          }
        }
      }

      before(:each) {
        post '/tacos',
        params: data
      }

      context 'meat value is empty' do
        let!(:data) {
          {
            'taco' =>
            {
              'rice': false,
              'salsa': true,
              'notes': 'Cooked medium rare'
            }
          }
        }

        it 'responds with 422 status' do
          expect(response.status).to eql(422)
        end

        it 'responds with validation error' do
          expect(json['errors'].first).to include(
            'code' => 'unprocessable_entity'
          )
        end
      end

      context 'meat value exceeds required length' do
        let!(:data) {
          {
            'taco' =>
            {
              'meat': 'A very large string is set hereasd.',
              'rice': false,
              'salsa': true,
              'notes': 'Cooked medium rare'
            }
          }
        }

        it 'responds with 422 status' do
          expect(response.status).to eql(422)
        end

        it 'responds with validation error' do
          expect(json['errors'].first).to include(
            'code' => 'unprocessable_entity'
          )
        end
      end
    end

    describe 'DELETE /tacos/:id' do
      context 'taco exists' do
        before(:each) {
          delete ['/tacos/', taco.id].join
        }

        it 'responds with 204 status with empty body' do
          expect(response.status).to eql(204)
          expect(response.body).to be_blank
        end
      end
    end
end
