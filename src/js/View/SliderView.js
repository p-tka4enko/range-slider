class SliderView {
  constructor(model, root) {
    this._model = model;
    this._$root = $(root).addClass('range-slider');
    this._model.addObserver(this.update.bind(this));
  }

  getRoot() {
    return this._$root;
  }

  update() {
    const { vertical } = this._model.getConfig();

    if (vertical) {
      this._setToVertical();
    } else {
      this._setToHorizontal();
    }
  }

  toString() {
    return '{"class": "SliderView"}';
  }

  _setToVertical() {
    this._$root.addClass('range-slider_vertical');
  }

  _setToHorizontal() {
    this._$root.removeClass('range-slider_vertical');
  }
}

export default SliderView;
