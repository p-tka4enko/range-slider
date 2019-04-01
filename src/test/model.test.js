import Model from '../js/model';

describe('Model', () => {

  let defaultConfig = {
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
    onUpdate: null
  };

  let customConfig = {
    min: 100,
    max: 1000,
    range: true,
    from: 150,
    to: 200,
    step: 2,
    vertical: true,
    displayHint: true,
    displayTracker: true,
    displayGrid: true,
    gridStep: 2,
    disabled: true,
    onInit: function() {},
    onStart: function() {},
    onSlide: function() {},
    onChange: function() {},
    onFinish: function() {},
    onUpdate: function() {}
  };

  describe('constructor', () => {
    it('должен реализовать настройки по умолчанию', () => {
      let model = new Model();
      expect(model.getConfig()).toEqual(defaultConfig);
    })

    it('должен один раз вызвать метод validate с настройками по умолчанию', () => {
      let validate = spyOn(Model.prototype, 'validate').and.callFake(function() {return {}});
      new Model();
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith(defaultConfig);
    })

    it('должен один раз вызвать метод validate с пользовательскими настройками', () => {
      let validate = spyOn(Model.prototype, 'validate').and.callFake(function() {return {}});
      new Model(customConfig);
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith(customConfig);
    })

    it('должен один раз вызвать метод onInit, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onInit: function(config) {}};
      let onInit = spyOn(fakeConfig, 'onInit');
      let model = new Model(fakeConfig);
      expect(onInit).toHaveBeenCalledTimes(1);
      expect(onInit).toHaveBeenCalledWith(model.getConfig());
    })
  })

  describe('validate', () => {
    let model = new Model();

    it('должен выбросить исключение при неверном типе данных конфигурации', () => {
      expect(function() {model.validate()}).toThrow();
      expect(function() {model.validate(undefined)}).toThrow();
      expect(function() {model.validate(0)}).toThrow();
      expect(function() {model.validate('0')}).toThrow();
      expect(function() {model.validate(true)}).toThrow();
      expect(function() {model.validate(null)}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства min', () => {
      expect(function() {model.validate({min: NaN})}).toThrow();
      expect(function() {model.validate({min: '0'})}).toThrow();
      expect(function() {model.validate({min: false})}).toThrow();
      expect(function() {model.validate({min: {}})}).toThrow();
      expect(function() {model.validate({min: null})}).toThrow();
      expect(function() {model.validate({min: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства max', () => {
      expect(function() {model.validate({max: NaN})}).toThrow();
      expect(function() {model.validate({max: '0'})}).toThrow();
      expect(function() {model.validate({max: false})}).toThrow();
      expect(function() {model.validate({max: {}})}).toThrow();
      expect(function() {model.validate({max: null})}).toThrow();
      expect(function() {model.validate({max: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства range', () => {
      expect(function() {model.validate({range: '0'})}).toThrow();
      expect(function() {model.validate({range: 0})}).toThrow();
      expect(function() {model.validate({range: {}})}).toThrow();
      expect(function() {model.validate({range: null})}).toThrow();
      expect(function() {model.validate({range: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства from', () => {
      expect(function() {model.validate({from: NaN})}).toThrow();
      expect(function() {model.validate({from: '0'})}).toThrow();
      expect(function() {model.validate({from: false})}).toThrow();
      expect(function() {model.validate({from: {}})}).toThrow();
      expect(function() {model.validate({from: null})}).toThrow();
      expect(function() {model.validate({from: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства to', () => {
      expect(function() {model.validate({to: NaN})}).toThrow();
      expect(function() {model.validate({to: '0'})}).toThrow();
      expect(function() {model.validate({to: false})}).toThrow();
      expect(function() {model.validate({to: {}})}).toThrow();
      expect(function() {model.validate({to: null})}).toThrow();
      expect(function() {model.validate({to: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства step', () => {
      expect(function() {model.validate({step: NaN})}).toThrow();
      expect(function() {model.validate({step: '0'})}).toThrow();
      expect(function() {model.validate({step: false})}).toThrow();
      expect(function() {model.validate({step: {}})}).toThrow();
      expect(function() {model.validate({step: null})}).toThrow();
      expect(function() {model.validate({step: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства vertical', () => {
      expect(function() {model.validate({vertical: '0'})}).toThrow();
      expect(function() {model.validate({vertical: 0})}).toThrow();
      expect(function() {model.validate({vertical: {}})}).toThrow();
      expect(function() {model.validate({vertical: null})}).toThrow();
      expect(function() {model.validate({vertical: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства displayHint', () => {
      expect(function() {model.validate({displayHint: '0'})}).toThrow();
      expect(function() {model.validate({displayHint: 0})}).toThrow();
      expect(function() {model.validate({displayHint: {}})}).toThrow();
      expect(function() {model.validate({displayHint: null})}).toThrow();
      expect(function() {model.validate({displayHint: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства displayTracker', () => {
      expect(function() {model.validate({displayTracker: '0'})}).toThrow();
      expect(function() {model.validate({displayTracker: 0})}).toThrow();
      expect(function() {model.validate({displayTracker: {}})}).toThrow();
      expect(function() {model.validate({displayTracker: null})}).toThrow();
      expect(function() {model.validate({displayTracker: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства displayGrid', () => {
      expect(function() {model.validate({displayGrid: '0'})}).toThrow();
      expect(function() {model.validate({displayGrid: 0})}).toThrow();
      expect(function() {model.validate({displayGrid: {}})}).toThrow();
      expect(function() {model.validate({displayGrid: null})}).toThrow();
      expect(function() {model.validate({displayGrid: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства gridStep', () => {
      expect(function() {model.validate({to: NaN})}).toThrow();
      expect(function() {model.validate({to: '0'})}).toThrow();
      expect(function() {model.validate({to: false})}).toThrow();
      expect(function() {model.validate({to: {}})}).toThrow();
      expect(function() {model.validate({to: null})}).toThrow();
      expect(function() {model.validate({to: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства disabled', () => {
      expect(function() {model.validate({disabled: '0'})}).toThrow();
      expect(function() {model.validate({disabled: 0})}).toThrow();
      expect(function() {model.validate({disabled: {}})}).toThrow();
      expect(function() {model.validate({disabled: null})}).toThrow();
      expect(function() {model.validate({disabled: function(){}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства onInit', () => {
      expect(function() {model.validate({onInit: false})}).toThrow();
      expect(function() {model.validate({onInit: 'null'})}).toThrow();
      expect(function() {model.validate({onInit: 0})}).toThrow();
      expect(function() {model.validate({onInit: {}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства onStart', () => {
      expect(function() {model.validate({onStart: false})}).toThrow();
      expect(function() {model.validate({onStart: '0'})}).toThrow();
      expect(function() {model.validate({onStart: 0})}).toThrow();
      expect(function() {model.validate({onStart: {}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства onSlide', () => {
      expect(function() {model.validate({onSlide: false})}).toThrow();
      expect(function() {model.validate({onSlide: '0'})}).toThrow();
      expect(function() {model.validate({onSlide: 0})}).toThrow();
      expect(function() {model.validate({onSlide: {}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства onChange', () => {
      expect(function() {model.validate({onChange: false})}).toThrow();
      expect(function() {model.validate({onChange: '0'})}).toThrow();
      expect(function() {model.validate({onChange: 0})}).toThrow();
      expect(function() {model.validate({onChange: {}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства onFinish', () => {
      expect(function() {model.validate({onFinish: false})}).toThrow();
      expect(function() {model.validate({onFinish: '0'})}).toThrow();
      expect(function() {model.validate({onFinish: 0})}).toThrow();
      expect(function() {model.validate({onFinish: {}})}).toThrow();
    })

    it('должен выбросить исключение при неверном типе данных свойства onUpdate', () => {
      expect(function() {model.validate({onUpdate: false})}).toThrow();
      expect(function() {model.validate({onUpdate: '0'})}).toThrow();
      expect(function() {model.validate({onUpdate: 0})}).toThrow();
      expect(function() {model.validate({onUpdate: {}})}).toThrow();
    })

    it('должен округлить свойство min до 4 знаков после запятой', () => {
      let config = model.validate({min: 0.12339, max: 100, step: 0.0617});
      expect(config.min).toEqual(0.1234);
    })

    it('должен округлить свойство max до 4 знаков после запятой', () => {
      let config = model.validate({min: 0, max: 0.12339, step: 0.0617});
      expect(config.max).toEqual(0.1234);
    })

    it('должен округлить свойство from до 4 знаков после запятой', () => {
      let config = model.validate({min: 0, max: 100, from: 0.12339, to: 10, step: 0.0617});
      expect(config.from).toEqual(0.1234);
    })

    it('должен округлить свойство to до 4 знаков после запятой', () => {
      let config = model.validate({min: 0, max: 100, from: 0, to: 0.12339, step: 0.0617});
      expect(config.to).toEqual(0.1234);
    })

    it('должен округлить свойство step до 4 знаков после запятой', () => {
      let config = model.validate({step: 0.12339});
      expect(config.step).toEqual(0.1234);
    })

    it('должен приравнять свойство min к max', () => {
      let config = model.validate({min: 1, max: 0});
      expect(config.min).toEqual(config.max);
    })

    it('должен приравнять свойство from к to', () => {
      let config = model.validate({range: true, from: 1, to: 0});
      expect(config.from).toEqual(config.to);
    })

    it('должен выравнять from и to между min и max', () => {
      let config1 = model.validate({min: 0, max: 10, from: -5, to: -1});
      expect(config1.from).toEqual(config1.min);
      expect(config1.to).toEqual(config1.min);

      let config2 = model.validate({min: 0, max: 10, from: -5, to: 5});
      expect(config2.from).toEqual(config2.min);
      expect(config2.to).toEqual(5);

      let config3 = model.validate({min: 0, max: 10, from: 5, to: 15});
      expect(config3.from).toEqual(5);
      expect(config3.to).toEqual(config3.max);

      let config4 = model.validate({min: 0, max: 10, from: 11, to: 15});
      expect(config4.from).toEqual(config4.max);
      expect(config4.to).toEqual(config4.max);
    })

    it('должен сделать свойство from кратным шагу слайдера', () => {
      let config1 = model.validate({min: 0, from: 4, step: 1.5});
      expect(config1.from).toEqual(4.5);

      let config2 = model.validate({min: -1, from: 4.5, step: 1.5});
      expect(config2.from).toEqual(5);
    })

    it('должен сделать свойство to кратным шагу слайдера', () => {
      let config1 = model.validate({min: 0, from: 0, to: 4, step: 1.5});
      expect(config1.to).toEqual(4.5);

      let config2 = model.validate({min: -1, from: 0, to: 4.5, step: 1.5});
      expect(config2.to).toEqual(5);
    })
  })

  describe('addObserver', () => {
    it('должен вернуть true, если наблюдатель был добавлен', () => {
      let model = new Model();
      expect(model.addObserver(function(){})).toEqual(true);
    })

    it('должен вернуть false, если наблюдатель уже существует', () => {
      let model = new Model();
      let o = function() {};
      model.addObserver(o);
      expect(model.addObserver(o)).toEqual(false);
    })

    it('должен выбросить исключение при неверном типе данных наблюдателя', () => {
      let model = new Model();
      expect(function(){model.addObserver(0)}).toThrow();
      expect(function(){model.addObserver('0')}).toThrow();
      expect(function(){model.addObserver(false)}).toThrow();
      expect(function(){model.addObserver(null)}).toThrow();
      expect(function(){model.addObserver({})}).toThrow();
    })
  })

  describe('update', () => {
    it('должен один раз вызвать метод validate с параметром {}', () => {
      let model = new Model();
      let validate = spyOn(model, 'validate').and.callFake(function() {});
      model.update({});
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith({});
    })

    it('должен один раз вызвать метод validate с параметром {a: 1}', () => {
      let model = new Model();
      let validate = spyOn(model, 'validate').and.callFake(function() {});
      model.update({a: 1});
      expect(validate).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledWith({a: 1});
    })

    it('должен один раз вызвать метод onUpdate, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onUpdate: function() {}};
      let onUpdate = spyOn(fakeConfig, 'onUpdate');
      let model = new Model(fakeConfig);
      model.update({});
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledWith(model.getConfig());
    })

    it('должен один раз оповестить наблюдателей', () => {
      let o = jasmine.createSpy();
      let model = new Model();
      model.addObserver(o);
      model.update({});
      expect(o).toHaveBeenCalledTimes(1);
    })
  })

  describe('reset', () => {
    it('должен вернуть настройки к настройкам по умолчанию', () => {
      let model = new Model();
      model.getConfig().min = 150;
      model.getConfig().max = 500;
      model.reset();
      expect(model.getConfig()).toEqual(defaultConfig);
    })

    it('должен вернуть настройки к пользовательским', () => {
      let model = new Model(customConfig);
      model.getConfig().min = 150;
      model.getConfig().max = 500;
      model.reset();
      expect(model.getConfig()).toEqual(customConfig);
    })

    it('должен один раз вызвать метод onUpdate, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onUpdate: function() {}};
      let onUpdate = spyOn(fakeConfig, 'onUpdate');
      let model = new Model(fakeConfig);
      model.reset();
      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledWith(model.getConfig());
    })

    it('должен один раз оповестить наблюдателей', () => {
      let o = jasmine.createSpy();
      let model = new Model();
      model.addObserver(o);
      model.update({});
      expect(o).toHaveBeenCalledTimes(1);
    })
  })

  describe('getNearestHandle', () => {
    it('должен вернуть FROM, если range равен false', () => {
      let model = new Model({from: 0, to: 100, range: false});
      let handle1 = model.getNearestHandle(0);
      let handle2 = model.getNearestHandle(100);
      expect(handle1).toEqual(model.handle.FROM);
      expect(handle2).toEqual(model.handle.FROM);
    })

    it('должен вернуть FROM', () => {
      let model = new Model({from: 20, to: 100, range: true});
      let handle = model.getNearestHandle(0);
      expect(handle).toEqual(model.handle.FROM);

      let model2 = new Model({from: 20, to: 20, range: true});
      let handle2 = model2.getNearestHandle(0);
      expect(handle2).toEqual(model2.handle.FROM);
    })

    it('должен вернуть TO', () => {
      let model = new Model({from: 20, to: 100, range: true});
      let handle = model.getNearestHandle(80);
      expect(handle).toEqual(model.handle.TO);

      let model2 = new Model({from: 20, to: 20, range: true});
      let handle2 = model2.getNearestHandle(80);
      expect(handle2).toEqual(model.handle.TO);
    })
  })

  describe('slide', () => {
    it('должен один раз оповестить наблюдателей', () => {
      let o = jasmine.createSpy();
      let model = new Model();
      model.addObserver(o);
      model.startSlide(model.handle.FROM);
      model.slide(5);
      expect(o).toHaveBeenCalledTimes(1);
    })

    it('должен один раз вызвать метод onSlide, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onSlide: function() {}};
      let onSlide = spyOn(fakeConfig, 'onSlide');
      let model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.slide(5);
      expect(onSlide).toHaveBeenCalledTimes(1);
      expect(onSlide).toHaveBeenCalledWith(model.getConfig());
    })

    it('должен один раз вызвать метод onChange, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onChange: function() {}};
      let onChange = spyOn(fakeConfig, 'onChange');
      let model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.slide(5);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(model.getConfig());
    })

    it('не должен вызывать метод onChange, если значение from не было изменено', () => {
      let fakeConfig = {from: 0, onChange: function() {}};
      let onChange = spyOn(fakeConfig, 'onChange');
      let model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.slide(0);
      expect(onChange).toHaveBeenCalledTimes(0);
    })

    it('не должен вызывать метод onChange, если значение to не было изменено', () => {
      let fakeConfig = {range: true, from: 0, to: 1, onChange: function() {}};
      let onChange = spyOn(fakeConfig, 'onChange');
      let model = new Model(fakeConfig);
      model.startSlide(model.handle.TO);
      model.slide(1);
      expect(onChange).toHaveBeenCalledTimes(0);
    })
  })

  describe('startSlide', () => {
    it('должен один раз вызвать метод onStart, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onStart: function() {}};
      let onStart = spyOn(fakeConfig, 'onStart');
      let model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.startSlide(model.handle.FROM);
      expect(onStart).toHaveBeenCalledTimes(1);
      expect(onStart).toHaveBeenCalledWith(model.getConfig());
    })

    it('должен при изменении состояния вернуть true, иначе false', () => {
      let model = new Model();
      let result1 = model.startSlide(model.handle.FROM);
      let result2 = model.startSlide(model.handle.FROM);
      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    })

    it('должен выбросить исключение при неверном типе данных ползунка', () => {
      let model = new Model();
      expect(function() {model.startSlide('0')}).toThrow();
      expect(function() {model.startSlide(false)}).toThrow();
      expect(function() {model.startSlide({})}).toThrow();
      expect(function() {model.startSlide(null)}).toThrow();
      expect(function() {model.startSlide(function(){})}).toThrow();
      expect(function() {model.startSlide(undefined)}).toThrow();
      expect(function() {model.startSlide()}).toThrow();
    })

    it('должен выбросить исключение, если ползунок не равен FROM или TO', () => {
      let model = new Model();
      expect(function() {model.startSlide('one')}).toThrow();
    })
  })

  describe('finishSlide', () => {
    it('должен один раз вызвать метод onFinish, передав в качестве аргумента конфигурацию модели', () => {
      let fakeConfig = {onFinish: function() {}};
      let onFinish = spyOn(fakeConfig, 'onFinish');
      let model = new Model(fakeConfig);
      model.startSlide(model.handle.FROM);
      model.finishSlide();
      model.finishSlide();
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish).toHaveBeenCalledWith(model.getConfig());
    })

    it('должен при изменении состояния вернуть true, иначе false', () => {
      let model = new Model();
      model.startSlide(model.handle.FROM);
      let result1 = model.finishSlide();
      let result2 = model.finishSlide();
      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    })
  })

})
