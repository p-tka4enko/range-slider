import $ from 'jquery';

class HandleView {
  constructor(model, root) {
    this._model = model;
    this._$leftHandle = $('<div>').appendTo(root).addClass('rangeslider__handle');
    this._$rightHandle = $('<div>').appendTo(root).addClass('rangeslider__handle');
    this._model.addObserver(this.update.bind(this));
  }

  getLeftHandle() {
    return this._$leftHandle;
  }

  getRightHandle() {
    return this._$rightHandle;
  }

  update() {
    const c = this._model.getConfig();

    if (c.range) {
      this._displayRightHandle();
    } else {
      this._hideRightHandle();
    }

    this._calculateHandlePosition();
  }

  toString() {
    return '{"class": "HandleView"}';
  }

  _displayRightHandle() {
    this._$rightHandle.removeClass('rangeslider__handle_hidden');
  }

  _hideRightHandle() {
    this._$rightHandle.addClass('rangeslider__handle_hidden');
  }

  _calculateHandlePosition() {
    const c = this._model.getConfig();

    const fromInPercent = c.min !== c.max ? (c.from - c.min) / (c.max - c.min) * 100 : 0;
    const toInPercent = c.min !== c.max ? (c.to - c.min) / (c.max - c.min) * 100 : 0;

    if (c.vertical) {
      this._$leftHandle.css('bottom', `${fromInPercent}%`).css('left', '');
      this._$rightHandle.css('bottom', `${toInPercent}%`).css('left', '');
    } else {
      this._$leftHandle.css('left', `${fromInPercent}%`).css('bottom', '');
      this._$rightHandle.css('left', `${toInPercent}%`).css('bottom', '');
    }
  }
}

export default HandleView;
