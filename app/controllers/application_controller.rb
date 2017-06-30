class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

  def record_not_found(exception)
    errors = {
      "errors": [
        {
          "status":   "404",
          "code":     "not_found",
          "title":    "Not Found",
          "message":   exception,
        }
      ]
    }
    render json: errors, status: 404
  end

  def invalid_record(message=nil)
    errors = {
      "errors": [
        {
          "status":   "422",
          "code":     "unprocessable_entity",
          "title":    "Unprocessable Entity",
          "message":  message
        }
      ]
    }
    render json: errors, status: 422
  end
end
