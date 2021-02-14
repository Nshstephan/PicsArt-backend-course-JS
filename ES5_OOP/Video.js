"use strict";

function Video(url, date, size, extension, length) {
    Entry.call(this, url, date, size)
    this.extension = extension;
    this.length = length;
}

Video.prototype.constructor = Video;

Video.prototype.isValid = function () {
    if (this.extension !== "avi" || this.extension !== "mp4" || this.extension !== "flv") {
        throw new Error("unsupported type");
    }
}