import $ from 'jquery';

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

    if (this._isCollision($leftHint, $rightHint)) {
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
    const maybeLeftGreaterThanHtmlWidth = left + width > htmlWidth ? htmlWidth - width : left;
    const newLeft = left < 0 ? 0 : maybeLeftGreaterThanHtmlWidth;

    return newLeft;
  }

  _getOffsetTopWithoutFallingOutOfDocument(top) {
    return top < 0 ? 0 : top;
  }

  _isCollision($obj1, $obj2) {
    if ($obj1.css('visibility') === 'hidden' || $obj2.css('visibility') === 'hidden') {
      return false;
    }

    const projectionX1 = {
      left: $obj1.offset().left,
      right: $obj1.offset().left + $obj1.outerWidth(),
    };

    const projectionX2 = {
      left: $obj2.offset().left,
      right: $obj2.offset().left + $obj2.outerWidth(),
    };

    const isCollisionX = !(
      (projectionX1.left <= projectionX2.left && projectionX1.right <= projectionX2.left)
      || (projectionX1.left >= projectionX2.right && projectionX1.right >= projectionX2.right)
    );

    const projectionY1 = {
      top: $obj1.offset().top,
      bottom: $obj1.offset().top + $obj1.outerHeight(),
    };

    const projectionY2 = {
      top: $obj2.offset().top,
      bottom: $obj2.offset().top + $obj2.outerHeight(),
    };

    const isCollisionY = !(
      (projectionY1.top <= projectionY2.top && projectionY1.bottom <= projectionY2.top)
      || (projectionY1.top >= projectionY2.bottom && projectionY1.bottom >= projectionY2.bottom)
    );

    return isCollisionX && isCollisionY;
  }
}

export default HintView;
