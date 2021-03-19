class EventEmitter {
    listeners = [];

    emit(eventName, data) {
        this.listeners
            .filter(({name}) => name === eventName)
            .forEach(
                ({callback}) => setTimeout(
                    callback.apply(this, [this, ...data]), 0));
    }

    on(name, callback) {
        if (
            typeof callback === 'function'
            && typeof name === 'string'
        ) {
            this.listeners.push({name, callback});
        }
    }

    off(eventName, callback) {
        this.listeners = this.listeners.filter(
            listener => !(listener.name === eventName &&
                listener.callback === callback)
        );
    }

    destroy() {
        this.listener.length = 0;
    }
}