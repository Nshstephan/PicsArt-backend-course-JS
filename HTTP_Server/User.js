const shortid = require('shortid');

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.ID = shortid.generate();
    }

    static get() {
        return User.id;
    }
}

module.exports = User;