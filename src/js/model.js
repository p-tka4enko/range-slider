class Model {
  constructor(config) {
    this.handle = { FROM: 1, TO: 2 };
    this._currentHandle = null;
    this._observers = [];
    this._config = config;
    this._call(this._config.getConfig().onInit);
  }

  addObserver(observer) {
    const duplicate = this._observers.filter(o => o === observer);
    if (duplicate.length > 0) {
      return false;
    }

    this._observers.push(observer);

    return true;
  }

  getConfig() {
    return this._config.getConfig();
  }

  startSlide(handle) {
    const { disabled, onStart } = this._config.getConfig();

    if (this._currentHandle || disabled) {
      return false;
    }

    this._currentHandle = handle;
    this._call(onStart);

    return true;
  }

  finishSlide() {
    if (!this._currentHandle) {
      return false;
    }

    this._currentHandle = null;
    this._call(this._config.getConfig().onFinish);

    return true;
  }

  slide(value) {
    if (!this._currentHandle) {
      return;
    }

    const config = this._config.getConfig();
    const {
      from,
      to,
      onChange,
      onSlide,
    } = config;

    if (this._currentHandle === this.handle.FROM) {
      this._config.updateFrom(value);
    } else if (this._currentHandle === this.handle.TO) {
      this._config.updateTo(value);
    }

    if ((config.from !== from) || (config.to !== to)) {
      this._call(onChange);
    }

    this._call(onSlide);
    this._notifyObservers();
  }

  update(config) {
    this._config.update(config);
    this._call(this._config.getConfig().onUpdate);
    this._notifyObservers();
  }

  reset() {
    this._config.reset();
    this._call(this._config.getConfig().onUpdate);
    this._notifyObservers();
  }

  getNearestHandle(value) {
    const { range, from, to } = this._config.getConfig();

    if (range) {
      const distanceToFrom = Math.abs(from - value - 1);
      const distanceToTo = Math.abs(to - value + 1);
      return distanceToFrom > distanceToTo ? this.handle.TO : this.handle.FROM;
    }

    return this.handle.FROM;
  }

  toString() {
    return `{"class": "Model", "config": ${this._config}}`;
  }

  _notifyObservers() {
    this._observers.forEach((observer) => {
      observer();
    });
  }

  _call(func) {
    if (typeof func === 'function') {
      func(this.getConfig());
    }
  }
}

export default Model;
