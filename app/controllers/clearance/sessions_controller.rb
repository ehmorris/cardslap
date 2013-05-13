class Clearance::SessionsController < ApplicationController
  unloadable

  skip_before_filter :authorize, :only => [:create, :destroy]
  protect_from_forgery :except => :create

  def create
    @user = authenticate(params)
    if @user.nil?
      flash_failure_after_create
      @user = Clearance.configuration.user_model.new(params[:user])
      render :template => 'users/new', :layout => 'marketing'
    else
      sign_in(@user)
      redirect_back_or root_url
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end

  private

  def flash_failure_after_create
    flash.now[:notice] = translate(:bad_email_or_password,
      :scope   => [:clearance, :controllers, :sessions],
      :default => "There was an error. Either your email or your password aren't right, or you don't have an account.")
  end
end
