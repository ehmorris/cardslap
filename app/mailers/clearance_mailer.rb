class ClearanceMailer < ActionMailer::Base
  def change_password(user)
    @user = user
    mail :from    => Clearance.configuration.mailer_sender,
         :to      => @user.email,
         :subject => I18n.t(:change_password,
                           :scope   => [:clearance, :models, :clearance_mailer],
                           :default => "Change your password")
  end

  def new_share(user, invitee, deck)
    @user = user
    @deck = deck
    mail :from    => Clearance.configuration.mailer_sender,
         :to      => invitee,
         :subject => I18n.t(:new_share,
                           :scope   => [:clearance, :models, :clearance_mailer],
                           :default => "Someone has shared a cardslap with you")
  end
end
