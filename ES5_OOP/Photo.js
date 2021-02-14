"use strict";

function Photo(url, date, size, extension, isHQ) {
    Entry.call(this, url, date, size)
    this.extension = extension;
    this.length = length;
    this.isHQ = isHQ;
}

Photo.prototype.constructor = Photo;

Photo.prototype.isValid = function () {
    if (this.extension !== "jpeg" || this.extension !== "png" || this.extension !== "gif") {
        throw new Error("unsupported type");
    }
}