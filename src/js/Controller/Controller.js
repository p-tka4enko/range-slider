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

    const handleRangeSliderMouseDown = this._handleRangeSliderMouseDown.bind(this);
    const handleWindowMouseMove = this._handleWindowMouseMove.bind(this);
    const handleWindowMouseUp = this._handleWindowMouseUp.bind(this);
    const handleWindowResize = this._handleWindowResize.bind(this);
    const handleDocumentReady = this._handleDocumentReady.bind(this);

    this._views.sliderView.getRoot().on(`mousedown.Controller${this._id}`, handleRangeSliderMouseDown);
    $window.on(`mousemove.Controller${this._id}`, handleWindowMouseMove);
    $window.on(`mouseup.Controller${this._id}`, handleWindowMouseUp);
    $window.on(`resize.Controller${this._id}`, handleWindowResize);
    $document.ready(handleDocumentReady);
  }

  _handleRangeSliderMouseDown(event) {
    event.preventDefault();

    const value = this._calculateValue(event);
    const handle = this._model.getNearestHandle(value);

    this._model.startSlide(handle);
    this._model.slide(value);
  }

  _handleWindowMouseMove(event) {
    const value = this._calculateValue(event);

    this._model.slide(value);
  }

  _calculateValue(event) {
    const { vertical, min, max } = this._model.getConfig();

    const point = this._getPointCoord(event);
    const sliderSizeInPx = this._getSliderSizeInPx();
    const k = vertical
      ? 1 - point / (sliderSizeInPx - 1)
      : point / (sliderSizeInPx - 1);
    const value = min + (max - min) * k;

    return value;
  }

  _getPointCoord(event) {
    const { vertical } = this._model.getConfig();
    const { sliderView } = this._views;

    const pointCoordX = event.pageX - sliderView.getRoot().offset().left;
    const pointCoordY = event.pageY - sliderView.getRoot().offset().top;

    return vertical ? pointCoordY : pointCoordX;
  }

  _getSliderSizeInPx() {
    const { vertical } = this._model.getConfig();
    const { sliderView } = this._views;

    return vertical ? sliderView.getRoot().height() : sliderView.getRoot().width();
  }

  _handleWindowMouseUp() {
    this._model.finishSlide();
  }

  _handleWindowResize() {
    this._updateViews();
  }

  _handleDocumentReady() {
    this._updateViews();
  }

  _updateViews() {
    const {
      sliderView,
      handleView,
      hintView,
      trackerView,
      gridView,
    } = this._views;

    sliderView.update();
    handleView.update();
    hintView.update();
    trackerView.update();
    gridView.update();
  }
}

export default Controller;
