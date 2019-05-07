import $ from 'jquery';

class TrackerView {
  constructor(model, root) {
    this._model = model;
    this._$tracker = $('<div>').appendTo(root).addClass('range-slider__tracker');
    this._model.addObserver(this.update.bind(this));
  }

  update() {
    const { displayTracker } = this._model.getConfig();

    if (displayTracker) {
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
    this._$tracker.removeClass('range-slider__tracker_hidden');
  }

  _hideTracker() {
    this._$tracker.addClass('range-slider__tracker_hidden');
  }

  _calculateTrackerSize() {
    const {
      min,
      max,
      from,
      to,
      range,
      vertical,
    } = this._model.getConfig();

    const fromInPercent = min !== max
      ? (from - min) / (max - min) * 100
      : 0;
    const toInPercent = min !== max
      ? (to - min) / (max - min) * 100
      : 0;
    const trackerSizeInPercent = range
      ? toInPercent - fromInPercent
      : fromInPercent;

    if (vertical) {
      this._$tracker.css('height', `${trackerSizeInPercent}%`).css('width', '');
    } else {
      this._$tracker.css('width', `${trackerSizeInPercent}%`).css('height', '');
    }
  }

  _calculateTrackerPosition() {
    const {
      min,
      max,
      from,
      range,
      vertical,
    } = this._model.getConfig();

    const fromInPercent = (from - min) / (max - min) * 100;
    const trackerOffsetInPercent = range ? fromInPercent : 0;

    if (vertical) {
      this._$tracker.css('bottom', `${trackerOffsetInPercent}%`).css('left', '');
    } else {
      this._$tracker.css('left', `${trackerOffsetInPercent}%`).css('bottom', '');
    }
  }
}

export default TrackerView;
