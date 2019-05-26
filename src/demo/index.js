import $ from 'jquery';

import SliderBlock from './components/slider-block/slider-block';
import './index.styl';
import './favicon.ico';

const configs = [
  {},

  {
    range: true,
    displayHint: true,
    displayTracker: true,
  },

  {
    min: 1,
    max: 10,
    from: 7,
    displayHint: true,
    displayTracker: true,
  },
];

const $sliderBlocks = $('.js-slider-block');

$sliderBlocks.each(function createSliderBlock(id) {
  new SliderBlock(this, configs[id]);
});
