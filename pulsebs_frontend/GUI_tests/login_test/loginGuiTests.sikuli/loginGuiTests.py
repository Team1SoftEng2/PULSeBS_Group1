#Testing the Login Page for students
click("1605711605817.png")
wait(2)

username="1605784266001.png"
pswsection="1605712212356.png"
loginButton="1605712233274.png"
refreshButton="1605712302688.png"
#Login error, invalid email
click(loginButton)

wait(1) # to be filled

wait(1.5)
click(refreshButton)
wait(1.5)
#Login error, invalid password

click(loginButton)

wait(1) # to be filled

wait(1.5)
click(refreshButton)
wait(1.5)
# Successful Login


click(loginButton)

wait(1) # to be filled

#-----------------------------------------------
#Testing the Login Page for teachers
wait(1.5)
click(refreshButton)
wait(1.5)

#Login error, invalid email

click(loginButton)

wait(1) # to be filled

wait(1.5)
click(refreshButton)
wait(1.5)
#Login error, invalid password

click(loginButton)

wait(1) # to be filled

wait(1.5)
click(refreshButton)
wait(1.5)
# Successful Login



click(loginButton)

wait(1) # to be filled









