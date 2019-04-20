import Config from './config';
import Model from './model';
import Controller from './controller';
import MainView from './views/main-view';
import HandleView from './views/handle-view';
import HintView from './views/hint-view';
import TrackerView from './views/tracker-view';
import GridView from './views/grid-view';

class RangeSlider {
  constructor(model) {
    this.handle = model.handle;
    this._model = model;
  }

  slide(handle, value) {
    this._model.startSlide(handle);
    this._model.slide(value);
    this._model.finishSlide();
  }

  update(config) {
    this._model.update(config);
  }

  reset() {
    this._model.reset();
  }

  toString() {
    return '{"class": "RangeSlider"}';
  }

  static init(jquery) {
    const $ = jquery;

    $.fn.rangeSlider = function rangeSlider(config) {
      return this.each(function createRangeSlider(controllerId) {
        if (!$(this).data('range-slider')) {
          const htmlConfig = $(this).data();
          const model = new Model(new Config(config, htmlConfig));

          const mainView = new MainView(model, this);
          const handleView = new HandleView(model, this);
          const hintView = new HintView(model, handleView);
          const trackerView = new TrackerView(model, this);
          const gridView = new GridView(model, this);

          new Controller(model, {
            mainView,
            handleView,
            hintView,
            trackerView,
            gridView,
          }, controllerId);

          $(this).data('range-slider', new RangeSlider(model));
        }
      });
    };
  }
}

export default RangeSlider;
