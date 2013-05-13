class Clearance::UsersController < ApplicationController
  unloadable

  before_filter :authorize
  skip_before_filter :authorize,   :only => [:new, :create]
  before_filter :redirect_to_root, :only => [:new, :create], :if => :signed_in?

  def new
    @user = Clearance.configuration.user_model.new(params[:user])
    render :template => 'users/new', :layout => 'marketing'
  end

  def edit
    @user = current_user
    render :template => 'users/show'
  end

  def update
    @user = current_user
    if @user.update_password(params[:user][:password])
      redirect_to account_path
      flash[:notice] = 'Password updated'
    else
      redirect_to account_path
      flash[:notice] = "Password can't be blank"
    end
  end

  def create
    @user = Clearance.configuration.user_model.new(params[:user])
    if @user.save
      sign_in(@user)
      redirect_back_or root_url
    else
      flash_failure_after_create
      render :template => 'users/new', :layout => 'marketing'
    end
  end

  private

  def flash_failure_after_create
    flash.now[:notice] = translate(:bad_email_or_password,
      :scope   => [:clearance, :controllers, :passwords],
      :default => "There was an error. That account may already exist.")
  end
end
