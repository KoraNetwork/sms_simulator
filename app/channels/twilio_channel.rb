class TwilioChannel < ActionCable::Channel::Base

  include TwilioHelper

  def subscribed
    stream_from "twilio_channel_#{ connection.phone_number }"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def appear(data)

  end

  def away

  end

  def speak(data)
    sender.api.account.messages.create(
        from: from_number,
        to: connection.phone_number,
        body: data["message"]
    )
    ActionCable.server.broadcast "twilio_channel_#{ connection.phone_number }", content: 'Ok'
  end
end