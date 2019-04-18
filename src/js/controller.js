import $ from 'jquery';

class Controller {
  constructor(model, views, id) {
    this._model = model;
    this._views = views;
    this._id = id;
    this._bindEvents();
  }

  toString() {
    return `{"class": "Controller", "id": "${this._id}"}`;
  }

  _bindEvents() {
    const $window = $(window);
    const $document = $(document);

    this._views.mainView.getRoot().on(`mousedown.Controller${this._id}`, this._handleStartSlide.bind(this));
    $window.on(`mousemove.Controller${this._id}`, this._handleSlide.bind(this));
    $window.on(`mouseup.Controller${this._id}`, this._model.finishSlide.bind(this._model));
    $window.on(`resize.Controller${this._id}`, this._updateViews.bind(this));
    $document.ready(this._updateViews.bind(this));
  }

  _handleStartSlide(event) {
    event.preventDefault();

    const value = this._calculateValue(event);
    const handle = this._model.getNearestHandle(value);

    this._model.startSlide(handle);
    this._model.slide(value);
  }

  _handleSlide(event) {
    const value = this._calculateValue(event);

    this._model.slide(value);
  }

  _calculateValue(event) {
    const c = this._model.getConfig();
    const point = this._getPointCoord(event);
    const sliderSizeInPx = this._getSliderSizeInPx();
    const k = c.vertical ? 1 - point / (sliderSizeInPx - 1) : point / (sliderSizeInPx - 1);
    const value = c.min + (c.max - c.min) * k;

    return value;
  }

  _getPointCoord(event) {
    return this._model.getConfig().vertical
      ? event.pageY - this._views.mainView.getRoot().offset().top
      : event.pageX - this._views.mainView.getRoot().offset().left;
  }

  _getSliderSizeInPx() {
    return this._model.getConfig().vertical
      ? this._views.mainView.getRoot().height()
      : this._views.mainView.getRoot().width();
  }

  _updateViews() {
    this._views.mainView.update();
    this._views.handleView.update();
    this._views.hintView.update();
    this._views.trackerView.update();
    this._views.gridView.update();
  }
}

export default Controller;
