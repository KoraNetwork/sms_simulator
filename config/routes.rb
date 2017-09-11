Rails.application.routes.draw do
  root to: 'pages#index'

  mount ActionCable.server => '/cable'
  mount TryApi::Engine => '/developers'

  scope '(:locale)' do
    resources :sms do
      collection do
        post :send_sms
        post :sms_answer
      end
    end
  end
end
