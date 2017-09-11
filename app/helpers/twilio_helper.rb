module TwilioHelper

  def sender
    @twilio ||= Twilio::REST::Client.new(
        ENV['TWILIO_ACCOUNT_SID'],
        ENV['TWILIO_AUTH_TOKEN']
    )
  end

  def from_number
    ENV['TWILIO_PHONE_NUMBER']
  end

end
