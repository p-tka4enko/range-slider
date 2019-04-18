import $ from 'jquery';

class MainView {
  constructor(model, root) {
    this._model = model;
    this._$root = $(root).addClass('rangeslider');
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
    return '{"class": "MainView"}';
  }

  _setToVertical() {
    this._$root.addClass('rangeslider_vertical');
  }

  _setToHorizontal() {
    this._$root.removeClass('rangeslider_vertical');
  }
}

export default MainView;
