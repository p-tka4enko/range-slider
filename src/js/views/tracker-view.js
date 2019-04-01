import $ from 'jquery';

class TrackerView {
  constructor(model, root) {
    this._model = model;
    this._$tracker = $('<div>').appendTo(root).addClass('rangeslider__tracker');
    this._model.addObserver(this.update.bind(this));
  }

  update() {
    const c = this._model.getConfig();

    if (c.displayTracker) {
      this._displayTracker();
      this._calculateTrackerSize();
      this._calculateTrackerPosition();
    } else {
      this._hideTracker();
    }
  }

  toString() {
    return '{"class": "TrackerView"}';
  }

  _displayTracker() {
    this._$tracker.removeClass('rangeslider__tracker_hidden');
  }

  _hideTracker() {
    this._$tracker.addClass('rangeslider__tracker_hidden');
  }

  _calculateTrackerSize() {
    const c = this._model.getConfig();

    const fromInPercent = c.min !== c.max ? (c.from - c.min) / (c.max - c.min) * 100 : 0;
    const toInPercent = c.min !== c.max ? (c.to - c.min) / (c.max - c.min) * 100 : 0;
    const trackerSizeInPercent = c.range ? toInPercent - fromInPercent : fromInPercent;

    if (c.vertical) {
      this._$tracker.css('height', `${trackerSizeInPercent}%`).css('width', '');
    } else {
      this._$tracker.css('width', `${trackerSizeInPercent}%`).css('height', '');
    }
  }

  _calculateTrackerPosition() {
    const c = this._model.getConfig();

    const fromInPercent = (c.from - c.min) / (c.max - c.min) * 100;
    const trackerOffsetInPercent = c.range ? fromInPercent : 0;

    if (c.vertical) {
      this._$tracker.css('bottom', `${trackerOffsetInPercent}%`).css('left', '');
    } else {
      this._$tracker.css('left', `${trackerOffsetInPercent}%`).css('bottom', '');
    }
  }
}

export default TrackerView;
