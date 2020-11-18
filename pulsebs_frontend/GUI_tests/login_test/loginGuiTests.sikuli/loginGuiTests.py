#Testing the Login Page for students
click("1605711605817.png")
type("1605712416809.png","http://localhost:3000/")
type(Key.ENTER)
wait(2)

#Login error, invalid email
type("1605712079393.png","s21111@studenti.polito.it")
type("1605712212356.png","11111")

click("1605712233274.png")

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
#Login error, invalid password
type("1605712079393.png","s27001@gmail.com")
type("1605712212356.png","asasasa")

click("1605712233274.png")

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
# Successful Login

type("1605712079393.png","s27001@gmail.com")
type("1605712212356.png","s27001")

click("1605712233274.png")

wait(1) # to be filled

#-----------------------------------------------
#Testing the Login Page for teachers
wait(1.5)
click("1605712302688.png")
wait(1.5)

#Login error, invalid email
type("1605712079393.png","t21111@studenti.polito.it")
type("1605712212356.png"," ")

click("1605712233274.png")

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
#Login error, invalid password
type("1605712079393.png","t37001@gmail.com")
type("1605712212356.png","asasasa")

click("1605712233274.png")

wait(1) # to be filled

wait(1.5)
click("1605712302688.png")
wait(1.5)
# Successful Login

type("1605712079393.png","t37001@gmail.com")
type("1605712212356.png","t37001")

click("1605712233274.png")

wait(1) # to be filled









