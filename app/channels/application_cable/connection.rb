module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :phone_number
    attr_accessor :phone_number

    def connect
      self.phone_number = cookies[:phone_number]
    end

  end
end
