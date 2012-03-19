class Clearance::UsersController < ApplicationController
  unloadable

  before_filter :authorize
  skip_before_filter :authorize,   :only => [:new, :create]
  before_filter :redirect_to_root, :only => [:new, :create], :if => :signed_in?

  def edit
    @user = current_user
    render :template => 'users/show'
  end

  def update
    @user = current_user
    @user.update_attributes(params[:user])
  end

  def new
    @user = Clearance.configuration.user_model.new(params[:user])
    render :template => 'users/new'
  end

  def create
    @user = Clearance.configuration.user_model.new(params[:user])
    if @user.save
      sign_in(@user)
      redirect_back_or(url_after_create)
    else
      flash_failure_after_create
      render :template => 'users/new'
    end
  end

  private

  def flash_failure_after_create
    flash.now[:notice] = translate(:bad_email_or_password,
      :scope   => [:clearance, :controllers, :passwords],
      :default => "Sorry, there was a problem with your sign up info. Do you want to sign in?")
  end

  def url_after_create
    '/'
  end
end
