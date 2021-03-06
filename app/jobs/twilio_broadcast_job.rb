class TwilioBroadcastJob < ApplicationJob

  queue_as :default

  def perform(data)
    ActionCable.server.broadcast "twilio_channel_#{ data[:phone_number] }", body: data[:message], incoming: true
  end
end