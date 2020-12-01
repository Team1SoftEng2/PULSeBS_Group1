// Setting mock DB
const dbMock = require('../../components/__mocks__/db');
jest.setMock('../../components/db', dbMock);

// Import modules
const db = require('../../components/db');
const Authentication = require('../../service/AuthenticationService');

// Define expected value
const user = {
    'userId': 's00001',
    'name': 'John',
    'surname': 'Smith',
    'email': 'john.smith@email.com',
    'hash': '$2a$10$9un76S8o2Liw/pIx5dhmMen9Mv89KEH/Vq5aLkqWfUF.GWXFei8V.' 
}

// Populate DB before every test
beforeEach( () => {
    const sql = "INSERT INTO Student(StudentID, Name, Surname, emailAddress, password) VALUES('s00001', 'John', 'Smith', 'john.smith@email.com', '$2a$10$9un76S8o2Liw/pIx5dhmMen9Mv89KEH/Vq5aLkqWfUF.GWXFei8V.')";
    db.run(sql, (err) => {
        if(err)
            console.log(err);
    })
})

// Clear DB after every test
afterEach( () => {
    const sql = 'DELETE FROM Student';
    db.run(sql, (err) => {
        if(err)
            console.log(err);
    })
})

// Test getUserById
test('Testing getUserById', () => { 
    Authentication.getUserById('s00001')
        .then( (data) => {
            expect.assertions(1);
            expect(data).toEqual(user);
        })
        .catch( (data) => {
            expect.assertions(1);
            expect(data).toBeUndefined;
        });
});

// Test checkPassword
test('Testing checkPassword', () => {
    expect(Authentication.checkPassword(user,'password')).toBeTruthy;
});