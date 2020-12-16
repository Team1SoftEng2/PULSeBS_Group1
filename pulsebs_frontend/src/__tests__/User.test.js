import User from '../api/User';

test('User constructor', () => {
    let user = new User('id', 'name', 'surname', 'email');
    expect(user.userId).toBe('id');
    expect(user.name).toBe('name');
    expect(user.surname).toBe('surname');
    expect(user.email).toBe('email');
});