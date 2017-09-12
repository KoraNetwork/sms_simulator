class SmsController < ApplicationController

  include TwilioHelper

  def send_sms
    sender.api.account.messages.create(
        from: from_number,
        to: params[:to_number],
        body: params[:message]
    )
    render json: { message: 'Ok' }
  end

  def sms_answer
    TwilioBroadcastJob.perform_later({
                                         phone_number: params["From"],
                                         message: params["Body"]
                                     })
  end

end