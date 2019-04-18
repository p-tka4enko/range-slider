import $ from 'jquery';

class GridView {
  constructor(model, root) {
    this._model = model;
    this._$grid = $('<div>').appendTo(root).addClass('rangeslider__grid');
    this._model.addObserver(this.update.bind(this));
  }

  update() {
    const { displayGrid } = this._model.getConfig();

    if (displayGrid) {
      this._displayGrid();
      this._updateGrid();
    } else {
      this._hideGrid();
    }
  }

  toString() {
    return '{"class": "GridView"}';
  }

  _displayGrid() {
    this._$grid.removeClass('rangeslider__grid_hidden');
  }

  _hideGrid() {
    this._$grid.addClass('rangeslider__grid_hidden');
  }

  _updateGrid() {
    const {
      min,
      max,
      gridStep,
      vertical,
    } = this._model.getConfig();

    this._$grid.empty();

    for (let i = min; i < max; i += gridStep) {
      const gridMarkLeftOffsetInPercent = (i - min) / (max - min) * 100;
      const gridDirection = vertical ? 'bottom' : 'left';
      this._addGridMark(i, gridMarkLeftOffsetInPercent, gridDirection);

      if (i + gridStep >= max) {
        this._addGridMark(max, 100, gridDirection);
      }
    }
  }

  _addGridMark(value, offset, direction) {
    $('<div>')
      .appendTo(this._$grid)
      .addClass('rangeslider__grid-mark')
      .text(value)
      .css(direction, `${offset}%`);
  }
}

export default GridView;
