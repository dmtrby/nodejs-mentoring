class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  addListener(eventName, fn) {
    const listenersArray = this.listeners[eventName];
    if (listenersArray) {
      listenersArray.push(fn);
    } else {
      this.listeners[eventName] = [fn];
    }
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    const listenersArray = this.listeners[eventName];
    for (let i = 0; i < listenersArray.length; i += 1) {
      if (listenersArray[i] === fn) {
        listenersArray.splice(i, 1);
        break;
      }
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceCallback = () => {
      fn();
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  emit(eventName, ...args) {
    const listeners = this.listeners[eventName];
    listeners &&
      listeners.forEach((listener) => {
        listener(...args);
      });
  }

  listenerCount(eventName) {
    return this.listeners[eventName] && this.listeners[eventName].length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}

module.exports = { EventEmitter };
