class TwilioChannel < ActionCable::Channel::Base

  include TwilioHelper

  def subscribed
    stream_from "twilio_channel_#{ params[:phone_number] }"
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
        to: data["phone_number"],
        body: data["body"]
    )
    ActionCable.server.broadcast "twilio_channel_#{ data["phone_number"] }", body: data["body"]
  end
end