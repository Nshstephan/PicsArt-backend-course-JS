function promisify(callBack) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            callBack(...args, (err, data) => {
                try {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                } catch (e) {
                    reject(e);
                }
            })
        })
    }
}