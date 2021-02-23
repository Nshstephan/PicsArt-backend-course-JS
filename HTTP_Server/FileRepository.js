const fs = require('fs');
const User = require('./User');

class FileRepository {
    constructor() {
        this.path = './data.json';
    }

    create(user) {
        const users = this.getData();
        users.push(user);
        this.saveData(users);
    }

    saveData(array, boolean = true) {
        const dataJSON = JSON.stringify(array);
        fs.writeFileSync(this.path, dataJSON);
        if (boolean)
            console.log("User added successfully");
    }

    getData() {
        try {
            const dataBuffer = fs.readFileSync(this.path);
            const dataJSON = dataBuffer.toString();
            return JSON.parse(dataJSON);
        } catch (err) {
            return [];
        }
    }

    getById(id) {
        const data = this.getData();
        for (const x of data) {
            if (x.ID === id)
                return x;
        }
        return 'User not found.';
    }

    getByName(name) {
        const data = this.getData();
        for (const x of data) {
            if (x.firstName === name)
                return x;
        }
        return 'User not found.';
    }

    removeById(id) {
        const users = this.getData();
        let i = 0;
        for (const x of users) {
            if (x.ID === id) {
                users.splice(i, 1);
                break;
            }
            ++i;
        }
        this.saveData(users, false);
    }

    updateUser(id, firstName, lastName, email, password) {
        let i = 0;
        const users = this.getData();
        for (const x of users) {
            if (x.ID === id) {
                let newUser = new User(firstName, lastName, email, password);
                newUser.setId(id);
                users.splice(i, 1, newUser);
                break;
            }
            ++i;
        }
        this.saveData(users, false);
        console.log('User updated successfully')
    }
}

module.exports = FileRepository;