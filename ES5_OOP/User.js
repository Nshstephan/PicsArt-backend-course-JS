"use strict";

function User(username, password, name, surname, dob, isPremium) {
    Account.call(this, username, password);
    this.name = name;
    this.surname = surname;
    this.dob = new Date(dob);
    this.isPremium = isPremium;
    this.photo = [];
    this.video = [];
}

User.prototype = Object.create(Account.prototype);
User.prototype.constructor = User;

User.prototype.newPost = function (data) {
    if (typeof data == "photo") {
        this.photo.push(data);
        console.log("Your photo has been uploaded successfully");
    } else if (typeof data == "video") {
        this.video.push(data);
        console.log("Your video has been uploaded successfully");
    }
    throw new Error("Something went wrong :( ");
}

User.prototype.showPhotos = function (){
    this.photo.forEach(x => console.log(x));
}
User.prototype.showVideos = function (){
    this.photo.forEach(x => console.log(x));
}

User.prototype.unlockFeatures = function (){
    if (this.isPremium){
        console.log("All features are unlocked");
    }
    throw new Error("Your account is not premium ")
}