class TwilioBroadcastJob < ApplicationJob

  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "twilio_channel_#{ message.phone_number }", message: message.data
  end
end