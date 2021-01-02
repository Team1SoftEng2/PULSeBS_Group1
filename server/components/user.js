/* eslint-disable require-jsdoc */
class User {
  constructor(id, name, surname, email, hash) {
    this.userId = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    if (hash) {
      this.hash = hash;
    }
  }
}

module.exports = User;
