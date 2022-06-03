class EventNotifier {
  #registry;
  constructor() {
    this.#registry = {};
  }

  register(event, action) {
    this.#registry[event] = this.#registry[event] || [];
    this.#registry[event].push(action);
  }

  notify(event, ...args) {
    if (!this.#registry[event]) {
      return;
    }
    this.#registry[event].forEach((action) => action.apply(null, args));
  }

  getEvents() {
    return Object.keys(this.#registry);
  }
}

exports.EventNotifier = EventNotifier;
