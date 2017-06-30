module Requests
  module JsonHelpers
    def json
      JSON.parse(response.body)
    end
  end

  module RequestHelpers
    def request_headers
      {
        "CONTENT_TYPE" => "application/json",
        "ACCEPT" => "application/json",
      }
    end
  end
end

RSpec.configure do |config|
  config.include Requests::JsonHelpers, type: :request
  config.include Requests::RequestHelpers, type: :request
end
