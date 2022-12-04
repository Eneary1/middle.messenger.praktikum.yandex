class EventBus {
  constructor() {
    this.listeners = {};
  }

  public listeners: object;

  public on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: Function) => listener !== callback,
    );
  }

  public emit(event: string, ...args: Array<any>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: Function) => {
      listener(...args);
    });
  }
}

export { EventBus };
