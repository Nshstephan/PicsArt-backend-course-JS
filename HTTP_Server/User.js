class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pass = password;
        this.ID = User.get();
        User.incr();
    }

    setId(i) {
        this.ID = i;
    }

    static get() {
        return User.id;
    }

    static incr() {
        User.id++;
    }

    static id = 0;
}

module.exports = User;