class ClearanceMailer < ActionMailer::Base
  def change_password(user)
    @user = user
    mail :from    => Clearance.configuration.mailer_sender,
         :to      => @user.email,
         :subject => I18n.t(:change_password,
                           :scope   => [:clearance, :models, :clearance_mailer],
                           :default => "Change your password")
  end

  def new_share(user, invitee, deck, share)
    @user    = user
    @invitee = invitee
    @deck    = deck
    @share   = share
    mail :from    => Clearance.configuration.mailer_sender,
         :cc      => @user.email,
         :to      => invitee,
         :subject => I18n.t(:new_share,
                           :scope   => [:clearance, :models, :clearance_mailer],
                           :default => "You've been cardslapped!")
  end
end
