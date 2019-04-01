import $ from 'jquery';

import RangeSlider from '../js/rangeslider';
import './components/slider-block.styl';
import './demo.styl';
import './favicon.ico';

RangeSlider.init($);

// Slider 1
const $sliderBlock1 = $('.slider-block').eq(0);
const $slider1 = $sliderBlock1.find('.slider-block__slider');
const $min1 = $sliderBlock1.find('.slider-block__min');
const $max1 = $sliderBlock1.find('.slider-block__max');
const $range1 = $sliderBlock1.find('.slider-block__range');
const $from1 = $sliderBlock1.find('.slider-block__from');
const $to1 = $sliderBlock1.find('.slider-block__to');
const $step1 = $sliderBlock1.find('.slider-block__step');
const $vertical1 = $sliderBlock1.find('.slider-block__vertical');
const $displayHint1 = $sliderBlock1.find('.slider-block__display-hint');
const $displayTracker1 = $sliderBlock1.find('.slider-block__display-tracker');
const $displayGrid1 = $sliderBlock1.find('.slider-block__display-grid');
const $gridStep1 = $sliderBlock1.find('.slider-block__grid-step');
const $disabled1 = $sliderBlock1.find('.slider-block__disabled');

const rangeslider1 = $slider1.rangeslider({
  onInit: (c) => {
    $min1.val(c.min).change(() => rangeslider1.update({ min: +$min1.val() }));
    $max1.val(c.max).change(() => rangeslider1.update({ max: +$max1.val() }));
    $range1.prop('checked', c.range).change(() => rangeslider1.update({ range: $range1.is(':checked') }));
    $from1.val(c.from).change(() => rangeslider1.update({ from: +$from1.val() }));
    $to1.val(c.to).change(() => rangeslider1.update({ to: +$to1.val() }));
    $step1.val(c.step).change(() => rangeslider1.update({ step: +$step1.val() }));
    $vertical1.prop('checked', c.vertical).change(() => rangeslider1.update({ vertical: $vertical1.is(':checked') }));
    $displayHint1.prop('checked', c.displayHint).change(() => rangeslider1.update({ displayHint: $displayHint1.is(':checked') }));
    $displayTracker1.prop('checked', c.displayTracker).change(() => rangeslider1.update({ displayTracker: $displayTracker1.is(':checked') }));
    $displayGrid1.prop('checked', c.displayGrid).change(() => rangeslider1.update({ displayGrid: $displayGrid1.is(':checked') }));
    $gridStep1.val(c.gridStep).change(() => rangeslider1.update({ gridStep: +$gridStep1.val() }));
    $disabled1.prop('checked', c.disabled).change(() => rangeslider1.update({ disabled: $disabled1.is(':checked') }));
  },
  onUpdate: (c) => {
    $min1.val(c.min);
    $max1.val(c.max);
    $range1.prop('checked', c.range);
    $from1.val(c.from);
    $to1.val(c.to);
    $step1.val(c.step);
    $vertical1.prop('checked', c.vertical);
    $displayHint1.prop('checked', c.displayHint);
    $displayTracker1.prop('checked', c.displayTracker);
    $displayGrid1.prop('checked', c.displayGrid);
    $gridStep1.val(c.gridStep);
    $disabled1.prop('checked', c.disabled);
  },
  onChange: (c) => {
    $from1.val(c.from);
    $to1.val(c.to);
  }
}).data('rangeslider');

// Slider 2
const $sliderBlock2 = $('.slider-block').eq(1);
const $slider2 = $sliderBlock2.find('.slider-block__slider');
const $min2 = $sliderBlock2.find('.slider-block__min');
const $max2 = $sliderBlock2.find('.slider-block__max');
const $range2 = $sliderBlock2.find('.slider-block__range');
const $from2 = $sliderBlock2.find('.slider-block__from');
const $to2 = $sliderBlock2.find('.slider-block__to');
const $step2 = $sliderBlock2.find('.slider-block__step');
const $vertical2 = $sliderBlock2.find('.slider-block__vertical');
const $displayHint2 = $sliderBlock2.find('.slider-block__display-hint');
const $displayTracker2 = $sliderBlock2.find('.slider-block__display-tracker');
const $displayGrid2 = $sliderBlock2.find('.slider-block__display-grid');
const $gridStep2 = $sliderBlock2.find('.slider-block__grid-step');
const $disabled2 = $sliderBlock2.find('.slider-block__disabled');

const rangeslider2 = $slider2.rangeslider({
  range: true,
  displayHint: true,
  displayTracker: true,
  onInit: (c) => {
    $min2.val(c.min).change(() => rangeslider2.update({ min: +$min2.val() }));
    $max2.val(c.max).change(() => rangeslider2.update({ max: +$max2.val() }));
    $range2.prop('checked', c.range).change(() => rangeslider2.update({ range: $range2.is(':checked') }));
    $from2.val(c.from).change(() => rangeslider2.update({ from: +$from2.val() }));
    $to2.val(c.to).change(() => rangeslider2.update({ to: +$to2.val() }));
    $step2.val(c.step).change(() => rangeslider2.update({ step: +$step2.val() }));
    $vertical2.prop('checked', c.vertical).change(() => rangeslider2.update({ vertical: $vertical2.is(':checked') }));
    $displayHint2.prop('checked', c.displayHint).change(() => rangeslider2.update({ displayHint: $displayHint2.is(':checked') }));
    $displayTracker2.prop('checked', c.displayTracker).change(() => rangeslider2.update({ displayTracker: $displayTracker2.is(':checked') }));
    $displayGrid2.prop('checked', c.displayGrid).change(() => rangeslider2.update({ displayGrid: $displayGrid2.is(':checked') }));
    $gridStep2.val(c.gridStep).change(() => rangeslider2.update({ gridStep: +$gridStep2.val() }));
    $disabled2.prop('checked', c.disabled).change(() => rangeslider2.update({ disabled: $disabled2.is(':checked') }));
  },
  onUpdate: (c) => {
    $min2.val(c.min);
    $max2.val(c.max);
    $range2.prop('checked', c.range);
    $from2.val(c.from);
    $to2.val(c.to);
    $step2.val(c.step);
    $vertical2.prop('checked', c.vertical);
    $displayHint2.prop('checked', c.displayHint);
    $displayTracker2.prop('checked', c.displayTracker);
    $displayGrid2.prop('checked', c.displayGrid);
    $gridStep2.val(c.gridStep);
    $disabled2.prop('checked', c.disabled);
  },
  onChange: (c) => {
    $from2.val(c.from);
    $to2.val(c.to);
  }
}).data('rangeslider');

// Slider 3
const $sliderBlock3 = $('.slider-block').eq(2);
const $slider3 = $sliderBlock3.find('.slider-block__slider');
const $min3 = $sliderBlock3.find('.slider-block__min');
const $max3 = $sliderBlock3.find('.slider-block__max');
const $range3 = $sliderBlock3.find('.slider-block__range');
const $from3 = $sliderBlock3.find('.slider-block__from');
const $to3 = $sliderBlock3.find('.slider-block__to');
const $step3 = $sliderBlock3.find('.slider-block__step');
const $vertical3 = $sliderBlock3.find('.slider-block__vertical');
const $displayHint3 = $sliderBlock3.find('.slider-block__display-hint');
const $displayTracker3 = $sliderBlock3.find('.slider-block__display-tracker');
const $displayGrid3 = $sliderBlock3.find('.slider-block__display-grid');
const $gridStep3 = $sliderBlock3.find('.slider-block__grid-step');
const $disabled3 = $sliderBlock3.find('.slider-block__disabled');

const rangeslider3 = $slider3.rangeslider({
  min: 1,
  max: 10,
  from: 7,
  displayHint: true,
  displayTracker: true,
  onInit: (c) => {
    $min3.val(c.min).change(() => rangeslider3.update({ min: +$min3.val() }));
    $max3.val(c.max).change(() => rangeslider3.update({ max: +$max3.val() }));
    $range3.prop('checked', c.range).change(() => rangeslider3.update({ range: $range3.is(':checked') }));
    $from3.val(c.from).change(() => rangeslider3.update({ from: +$from3.val() }));
    $to3.val(c.to).change(() => rangeslider3.update({ to: +$to3.val() }));
    $step3.val(c.step).change(() => rangeslider3.update({ step: +$step3.val() }));
    $vertical3.prop('checked', c.vertical).change(() => rangeslider3.update({ vertical: $vertical3.is(':checked') }));
    $displayHint3.prop('checked', c.displayHint).change(() => rangeslider3.update({ displayHint: $displayHint3.is(':checked') }));
    $displayTracker3.prop('checked', c.displayTracker).change(() => rangeslider3.update({ displayTracker: $displayTracker3.is(':checked') }));
    $displayGrid3.prop('checked', c.displayGrid).change(() => rangeslider3.update({ displayGrid: $displayGrid3.is(':checked') }));
    $gridStep3.val(c.gridStep).change(() => rangeslider3.update({ gridStep: +$gridStep3.val() }));
    $disabled3.prop('checked', c.disabled).change(() => rangeslider3.update({ disabled: $disabled3.is(':checked') }));
  },
  onUpdate: (c) => {
    $min3.val(c.min);
    $max3.val(c.max);
    $range3.prop('checked', c.range);
    $from3.val(c.from);
    $to3.val(c.to);
    $step3.val(c.step);
    $vertical3.prop('checked', c.vertical);
    $displayHint3.prop('checked', c.displayHint);
    $displayTracker3.prop('checked', c.displayTracker);
    $displayGrid3.prop('checked', c.displayGrid);
    $gridStep3.val(c.gridStep);
    $disabled3.prop('checked', c.disabled);
  },
  onChange: (c) => {
    $from3.val(c.from);
    $to3.val(c.to);
  }
}).data('rangeslider');
