class HintView {
  constructor(model, handleView) {
    this._model = model;
    this._handleView = handleView;
    this._$leftHint = $('<div>').appendTo(handleView.getLeftHandle()).addClass('range-slider__hint');
    this._$rightHint = $('<div>').appendTo(handleView.getRightHandle()).addClass('range-slider__hint');
    this._model.addObserver(this.update.bind(this));
  }

  update() {
    const { displayHint, from, to } = this._model.getConfig();

    if (displayHint) {
      this._displayHints();
      this._setHintText(from, to);
      this._calculateHintPosition();
    } else {
      this._hideHints();
    }
  }

  toString() {
    return '{"class": "HintView"}';
  }

  _displayHints() {
    this._$leftHint.removeClass('range-slider__hint_hidden');
    this._$rightHint.removeClass('range-slider__hint_hidden');
  }

  _hideHints() {
    this._$leftHint.addClass('range-slider__hint_hidden');
    this._$rightHint.addClass('range-slider__hint_hidden');
  }

  _setHintText(leftHintText, rightHintText) {
    this._$leftHint.text(leftHintText);
    this._$rightHint.text(rightHintText);
  }

  _calculateHintPosition() {
    const $leftHint = this._$leftHint;
    const $rightHint = this._$rightHint;

    const $leftHandle = this._handleView.getLeftHandle();
    const $rightHandle = this._handleView.getRightHandle();

    const leftHandleTopSide = $leftHandle.offset().top;
    const leftHandleBottomSide = $leftHandle.offset().top + $leftHandle.outerHeight();
    const leftHandleLeftSide = $leftHandle.offset().left;
    const leftHandleRightSide = $leftHandle.offset().left + $leftHandle.outerWidth();

    const rightHandleTopSide = $rightHandle.offset().top;
    const rightHandleBottomSide = $rightHandle.offset().top + $rightHandle.outerHeight();
    const rightHandleLeftSide = $rightHandle.offset().left;
    const rightHandleRightSide = $rightHandle.offset().left + $rightHandle.outerWidth();

    const { vertical, from, to } = this._model.getConfig();

    if (vertical) {
      this._alignObjBetweenVerticalPoints($leftHint, leftHandleTopSide, leftHandleBottomSide);
      this._alignObjBetweenVerticalPoints($rightHint, rightHandleTopSide, rightHandleBottomSide);
      $leftHint.css('left', '');
      $rightHint.css('left', '');
    } else {
      this._alignObjBetweenHorizontalPoints($leftHint, leftHandleLeftSide, leftHandleRightSide);
      this._alignObjBetweenHorizontalPoints($rightHint, rightHandleLeftSide, rightHandleRightSide);
      $leftHint.css('top', '');
      $rightHint.css('top', '');
    }

    if (this._checkCollisionOfHints()) {
      $leftHint.text(`${from} — ${to}`);
      $rightHint.addClass('range-slider__hint_hidden');
      if (vertical) {
        this._alignObjBetweenVerticalPoints($leftHint, rightHandleTopSide, leftHandleBottomSide);
      } else {
        this._alignObjBetweenHorizontalPoints($leftHint, leftHandleLeftSide, rightHandleRightSide);
      }
    }
  }

  _alignObjBetweenHorizontalPoints($obj, point1, point2) {
    let left = point1 - ($obj.outerWidth() - point2 + point1) / 2;
    left = this._getOffsetLeftWithoutFallingOutOfDocument(left, $obj.outerWidth());
    $obj.offset({ left });
  }

  _alignObjBetweenVerticalPoints($obj, point1, point2) {
    let top = point1 - ($obj.outerHeight() - point2 + point1) / 2;
    top = this._getOffsetTopWithoutFallingOutOfDocument(top, $obj.outerHeight());
    $obj.offset({ top });
  }

  _getOffsetLeftWithoutFallingOutOfDocument(left, width) {
    const htmlWidth = $('html').width();
    const maybeLeftGreaterThanHtmlWidth = left + width > htmlWidth
      ? htmlWidth - width
      : left;
    const newLeft = left < 0 ? 0 : maybeLeftGreaterThanHtmlWidth;

    return newLeft;
  }

  _getOffsetTopWithoutFallingOutOfDocument(top) {
    return top < 0 ? 0 : top;
  }

  _checkCollisionOfHints() {
    const $leftHint = this._$leftHint;
    const $rightHint = this._$rightHint;

    if ($leftHint.css('visibility') === 'hidden' || $rightHint.css('visibility') === 'hidden') {
      return false;
    }

    const leftHintProjectionX = {
      left: $leftHint.offset().left,
      right: $leftHint.offset().left + $leftHint.outerWidth(),
    };

    const rightHintProjectionX = {
      left: $rightHint.offset().left,
      right: $rightHint.offset().left + $rightHint.outerWidth(),
    };

    const isCollisionX = !(
      (leftHintProjectionX.left <= rightHintProjectionX.left
      && leftHintProjectionX.right <= rightHintProjectionX.left)
      || (leftHintProjectionX.left >= rightHintProjectionX.right
      && leftHintProjectionX.right >= rightHintProjectionX.right)
    );

    const leftHintProjectionY = {
      top: $leftHint.offset().top,
      bottom: $leftHint.offset().top + $leftHint.outerHeight(),
    };

    const rightHintProjectionY = {
      top: $rightHint.offset().top,
      bottom: $rightHint.offset().top + $rightHint.outerHeight(),
    };

    const isCollisionY = !(
      (leftHintProjectionY.top <= rightHintProjectionY.top
      && leftHintProjectionY.bottom <= rightHintProjectionY.top)
      || (leftHintProjectionY.top >= rightHintProjectionY.bottom
      && leftHintProjectionY.bottom >= rightHintProjectionY.bottom)
    );

    return isCollisionX && isCollisionY;
  }
}

export default HintView;
