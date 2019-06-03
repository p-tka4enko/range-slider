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

    const handleRangeSliderStartSlide = this._handleRangeSliderStartSlide.bind(this);
    const handleWindowSlide = this._handleWindowSlide.bind(this);
    const handleWindowFinishSlide = this._handleWindowFinishSlide.bind(this);
    const handleWindowUpdateViews = this._handleWindowUpdateViews.bind(this);
    const handleDocumentUpdateViews = this._handleDocumentUpdateViews.bind(this);

    this._views.sliderView.getRoot().on(`mousedown.Controller${this._id}`, handleRangeSliderStartSlide);
    $window.on(`mousemove.Controller${this._id}`, handleWindowSlide);
    $window.on(`mouseup.Controller${this._id}`, handleWindowFinishSlide);
    $window.on(`resize.Controller${this._id}`, handleWindowUpdateViews);
    $document.ready(handleDocumentUpdateViews);
  }

  _handleRangeSliderStartSlide(event) {
    event.preventDefault();

    const value = this._calculateValue(event);
    const handle = this._model.getNearestHandle(value);

    this._model.startSlide(handle);
    this._model.slide(value);
  }

  _handleWindowSlide(event) {
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

  _handleWindowFinishSlide() {
    this._model.finishSlide();
  }

  _handleWindowUpdateViews() {
    this._updateViews();
  }

  _handleDocumentUpdateViews() {
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
