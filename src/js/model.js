import $ from 'jquery';

class Model {
  constructor(...configs) {
    this.handle = { FROM: 1, TO: 2 };
    this._currentHandle = null;
    this._observers = [];
    this._initialConfig = {};
    this._config = {};
    this._error = {
      OBSERVER_SHOULD_BE_FUNCTION: 'Тип наблюдателя должен быть function',
      HANDLE_SHOULD_BE_NUMBER: 'Тип ползунка должен быть number',
      HANDLE_CAN_BE_FROM_OR_TO: 'Ползунок может принимать значения только FROM или TO',
      CONFIG_SHOULD_BE_OBJECT: 'Конфигурация должна быть object',
      MIN_SHOULD_BE_NUMBER: 'Тип свойства min должно быть number',
      MAX_SHOULD_BE_NUMBER: 'Тип свойства max должно быть number',
      FROM_SHOULD_BE_NUMBER: 'Тип свойства from должно быть number',
      TO_SHOULD_BE_NUMBER: 'Тип свойства to должно быть number',
      STEP_SHOULD_BE_NUMBER: 'Тип свойства step должно быть number',
      RANGE_SHOULD_BE_BOOLEAN: 'Тип свойства range должно быть boolean',
      VERTICAL_SHOULD_BE_BOOLEAN: 'Тип свойства vertical должно быть boolean',
      DISPLAY_HINT_SHOULD_BE_BOOLEAN: 'Тип свойства displayHint должно быть boolean',
      DISPLAY_TRACKER_SHOULD_BE_BOOLEAN: 'Тип свойства displayTracker должно быть boolean',
      DISPLAY_GRID_SHOULD_BE_BOOLEAN: 'Тип свойства displayGrid должно быть boolean',
      GRID_STEP_SHOULD_BE_NUMBER: 'Тип свойства gridStep должно быть number',
      DISABLED_SHOULD_BE_BOOLEAN: 'Тип свойства disabled должно быть boolean',
      ON_INIT_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onInit должно быть function или null',
      ON_START_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onStart должно быть function или null',
      ON_SLIDE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onSlide должно быть function или null',
      ON_CHANGE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onChange должно быть function или null',
      ON_FINISH_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onFinish должно быть function или null',
      ON_UPDATE_SHOULD_BE_FUNCTION_OR_NULL: 'Тип свойства onUpdate должно быть function или null',
    };

    this._initConfig(configs);
  }

  addObserver(observer) {
    if (typeof observer !== 'function') {
      throw new Error(this._error.OBSERVER_SHOULD_BE_FUNCTION);
    }

    const duplicate = this._observers.filter(o => o === observer);
    if (duplicate.length > 0) {
      return false;
    }

    this._observers.push(observer);

    return true;
  }

  getConfig() {
    return this._config;
  }

  startSlide(handle) {
    if (typeof handle !== 'number' || Number.isNaN(handle)) {
      throw new Error(this._error.HANDLE_SHOULD_BE_NUMBER);
    }

    if (handle !== this.handle.FROM && handle !== this.handle.TO) {
      throw new Error(this._error.HANDLE_CAN_BE_FROM_OR_TO);
    }

    if (this._currentHandle || this._config.disabled) {
      return false;
    }

    this._currentHandle = handle;
    this._call(this._config.onStart);

    return true;
  }

  finishSlide() {
    if (!this._currentHandle) {
      return false;
    }

    this._currentHandle = null;
    this._call(this._config.onFinish);

    return true;
  }

  slide(value) {
    if (!this._currentHandle) {
      return;
    }

    const c = this._config;
    const { from, to } = c;

    if (this._currentHandle === this.handle.FROM) {
      c.from = this._alignValue(value, c.min, c.range ? c.to : c.max, c.step);
    } else if (this._currentHandle === this.handle.TO) {
      c.to = this._alignValue(value, c.from, c.max, c.step);
    }

    if ((c.from !== from) || (c.to !== to)) {
      this._call(c.onChange);
    }

    this._call(c.onSlide);
    this._notifyObservers();
  }

  update(config) {
    const c = this._config;

    $.extend(c, this.validate(config));
    this._call(c.onUpdate);
    this._notifyObservers();
  }

  reset() {
    this.update(this._initialConfig);
  }

  validate(config) {
    if (typeof config !== 'object' || config === null) {
      throw new Error(this._error.CONFIG_SHOULD_BE_OBJECT);
    }

    const validatedConfig = $.extend({}, this._config, config);
    this._checkConfigTypes(validatedConfig);
    this._alignConfigValues(validatedConfig);

    return validatedConfig;
  }

  getNearestHandle(value) {
    const c = this._config;

    if (c.range) {
      const distanceToFrom = Math.abs(c.from - value - 1);
      const distanceToTo = Math.abs(c.to - value + 1);
      return distanceToFrom > distanceToTo ? this.handle.TO : this.handle.FROM;
    }

    return this.handle.FROM;
  }

  toString() {
    return JSON.stringify({ class: 'Model', ...this._config });
  }

  _initConfig(configs) {
    this._config = {
      min: 0,
      max: 100,
      range: false,
      from: 0,
      to: 10,
      step: 1,
      vertical: false,
      displayHint: false,
      displayTracker: false,
      displayGrid: false,
      gridStep: 25,
      disabled: false,
      onInit: null,
      onStart: null,
      onSlide: null,
      onChange: null,
      onFinish: null,
      onUpdate: null,
    };

    configs.forEach((config) => {
      $.extend(this._config, config);
    });

    this._config = this.validate(this._config);
    this._initialConfig = $.extend({}, this._config);
    this._call(this._config.onInit);
  }

  _notifyObservers() {
    this._observers.forEach((observer) => {
      observer();
    });
  }

  _call(func) {
    if (typeof func === 'function') {
      func(this._config);
    }
  }

  _checkConfigTypes(config) {
    if (typeof config.min !== 'number' || Number.isNaN(config.min)) {
      throw new Error(this._error.MIN_SHOULD_BE_NUMBER);
    }

    if (typeof config.max !== 'number' || Number.isNaN(config.max)) {
      throw new Error(this._error.MAX_SHOULD_BE_NUMBER);
    }

    if (typeof config.from !== 'number' || Number.isNaN(config.from)) {
      throw new Error(this._error.FROM_SHOULD_BE_NUMBER);
    }

    if (typeof config.to !== 'number' || Number.isNaN(config.to)) {
      throw new Error(this._error.TO_SHOULD_BE_NUMBER);
    }

    if (typeof config.step !== 'number' || Number.isNaN(config.step)) {
      throw new Error(this._error.STEP_SHOULD_BE_NUMBER);
    }

    if (typeof config.range !== 'boolean') {
      throw new Error(this._error.RANGE_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.vertical !== 'boolean') {
      throw new Error(this._error.VERTICAL_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.displayHint !== 'boolean') {
      throw new Error(this._error.DISPLAY_HINT_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.displayTracker !== 'boolean') {
      throw new Error(this._error.DISPLAY_TRACKER_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.displayGrid !== 'boolean') {
      throw new Error(this._error.DISPLAY_GRID_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.gridStep !== 'number' || Number.isNaN(config.gridStep)) {
      throw new Error(this._error.GRID_STEP_SHOULD_BE_NUMBER);
    }

    if (typeof config.disabled !== 'boolean') {
      throw new Error(this._error.DISABLED_SHOULD_BE_BOOLEAN);
    }

    if (typeof config.onInit !== 'function' && config.onInit !== null) {
      throw new Error(this._error.ON_INIT_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onStart !== 'function' && config.onStart !== null) {
      throw new Error(this._error.ON_START_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onSlide !== 'function' && config.onSlide !== null) {
      throw new Error(this._error.ON_SLIDE_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onChange !== 'function' && config.onChange !== null) {
      throw new Error(this._error.ON_CHANGE_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onFinish !== 'function' && config.onFinish !== null) {
      throw new Error(this._error.ON_FINISH_SHOULD_BE_FUNCTION_OR_NULL);
    }

    if (typeof config.onUpdate !== 'function' && config.onUpdate !== null) {
      throw new Error(this._error.ON_UPDATE_SHOULD_BE_FUNCTION_OR_NULL);
    }
  }

  _alignConfigValues(config) {
    const c = config;

    c.min = +c.min.toFixed(4);
    c.max = +c.max.toFixed(4);
    c.step = +c.step.toFixed(4);

    if (c.max < c.min) {
      c.max = c.min;
    }

    c.from = this._alignValue(c.from, c.min, c.max, c.step);
    c.to = this._alignValue(c.to, c.from, c.max, c.step);

    if (c.from > c.to) {
      c.from = c.to;
    }
  }

  _alignValue(value, min, max, step) {
    let alignedValue = value;
    const sliderSize = max - min;

    if (alignedValue < min) {
      alignedValue = min;
    } else if (alignedValue <= (max - (sliderSize % step))) {
      const point1 = +(alignedValue - ((alignedValue - min) % step)).toFixed(4);
      const point2 = +((alignedValue + step) - ((alignedValue - min) % step)).toFixed(4);
      const average = (point1 + point2) / 2;
      alignedValue = alignedValue < average ? point1 : point2;
    } else {
      alignedValue = max;
    }

    return alignedValue;
  }
}

export default Model;
