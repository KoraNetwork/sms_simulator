Rails.application.routes.draw do
  root to: 'pages#index'

  scope '(:locale)' do

  end
end
