class Config {
  constructor(...configs) {
    this._config = null;
    this._initialConfig = null;
    this._error = {
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

  getConfig() {
    return this._config;
  }

  update(config) {
    Object.assign(this._config, this.validate(config));
  }

  updateFrom(value) {
    const { min, max, range, to, step } = this._config;
    this._config.from = this._getAlignedValue(value, min, range ? to : max, step);
  }

  updateTo(value) {
    const { from, max, step } = this._config;
    this._config.to = this._getAlignedValue(value, from, max, step);
  }

  reset() {
    this.update(this._initialConfig);
  }

  validate(config) {
    if (typeof config !== 'object' || config === null) {
      throw new Error(this._error.CONFIG_SHOULD_BE_OBJECT);
    }

    const validatedConfig = { ...this._config, ...config };

    this._checkConfigTypes(validatedConfig);

    return this._getAlignedConfig(validatedConfig);
  }

  toString() {
    return JSON.stringify({ class: 'Config', ...this._config });
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
      Object.assign(this._config, config);
    });

    this._config = this.validate(this._config);
    this._initialConfig = { ...this._config };
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

  _getAlignedConfig(config) {
    let {
      min,
      max,
      step,
      from,
      to,
    } = config;

    min = +min.toFixed(4);
    max = +max.toFixed(4);
    step = +step.toFixed(4);

    if (max < min) {
      max = min;
    }

    from = this._getAlignedValue(from, min, max, step);
    to = this._getAlignedValue(to, from, max, step);

    if (from > to) {
      from = to;
    }

    return {
      ...config,
      min,
      max,
      step,
      from,
      to,
    };
  }

  _getAlignedValue(value, min, max, step) {
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

export default Config;
