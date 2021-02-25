const fs = require('fs');
const chalk = require('chalk');
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
            console.log(chalk.green.inverse("User added successfully."));
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
        console.log(chalk.red.inverse('User not found.'));
        return null;
    }

    getByFullName(first, last) {
        const data = this.getData();
        for (const x of data) {
            if (x.firstName === first || x.lastName === last)
                return x;
        }
        console.log(chalk.red.inverse('User not found.'));
        return null;
    }

    removeById(id) {
        let deleted = false;
        const users = this.getData();
        let i = 0;
        for (const x of users) {
            if (x.ID === id) {
                users.splice(i, 1);
                deleted = true;
                break;
            }
            ++i;
        }
        this.saveData(users, false);
        if(!deleted)
            console.log(chalk.red.inverse(`There is no user with ID: ${id}`));
        console.log(chalk.green.inverse('User deleted successfully.'));
    }

    updateUser(ID, firstName, lastName, email, password) {
        let found = false;
        let users = this.getData();
        for (let x of users) {
            if (x.ID === ID) {
                if (firstName)
                    x.firstName = firstName;
                if (lastName)
                    x.lastName = lastName;
                if (email)
                    x.email = email;
                if (password)
                    x.password = password;
                found = true;
                break;
            }
        }
        this.saveData(users, false);
        if (!found) {
            console.log(chalk.red.inverse(`There is no user with ID: ${ID}`));
            return false;
        }
        console.log(chalk.green.inverse('User updated successfully.'));
        return true;
    }
}


module.exports = FileRepository;