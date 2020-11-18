#Testing of the Student page
click("1605714275397.png")
type("1605715898250.png","http://localhost:3000/student")
type(Key.ENTER)
wait(1.5)

find("1605716150659.png")

# testing seat booking

click("1605716404056.png")
find("1605716442370.png")

click(Pattern("1605716469075.png").targetOffset(204,18))
find("1605716584529.png")

wait(1.5)

# testing for unbooking the seat
find("1605716442370.png")
click(Pattern("1605716644170.png").targetOffset(221,15))
find("1605716728935.png")
wait(1.5)
