#Testing the Login Page for students
click("1605711605817.png")
type("1605712416809.png","http://localhost:3000/")
type(Key.ENTER)
wait(2)

username="1605784266001.png"
password="1605712212356.png"
loginButton="1605712233274.png"
#Login error, invalid email
type(email,"s21111@studenti.polito.it")
type(password,"11111")

click(loginButton)

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
#Login error, invalid password
type(username,"s27001@gmail.com")
type(password,"asasasa")

click(loginButton)

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
# Successful Login

type(username,"s27001@gmail.com")
type(password,"s27001")

click(loginButton)

wait(1) # to be filled

#-----------------------------------------------
#Testing the Login Page for teachers
wait(1.5)
click("1605712302688.png")
wait(1.5)

#Login error, invalid email
type(username,"t21111@studenti.polito.it")
type(password," ")

click(loginButton)

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
#Login error, invalid password
type(username,"t37001@gmail.com")
type(password,"asasasa")

haclick(loginButton)

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
# Successful Login

type(username,"t37001@gmail.com")
type(password,"t37001")

click(loginButton)

wait(1) # to be filled









