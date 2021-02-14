"use strict";

function Account(username, password, loggedInSuccessfully) {
    this.username = username;
    this.password = password;
    this.loggedInSuccessfully = loggedInSuccessfully;
}

Account.prototype.displayInfo = function () {
    if (this.loggedInSuccessfully === true) {
        console.log("Welcome");
    }
}