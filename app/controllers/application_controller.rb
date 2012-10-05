class ApplicationController < ActionController::Base
  include Clearance::Authentication
  protect_from_forgery

  def default_url_options
    if Rails.env.production?
      {:host => "http://cardslap.heroku.com"}
    else
      {}
    end
  end
end
