puts "Create admin ..."
User.create email: 'admin@SmsSimulator.com', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: Role.admin.id