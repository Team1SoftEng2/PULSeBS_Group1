#Testing of the Student page


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
