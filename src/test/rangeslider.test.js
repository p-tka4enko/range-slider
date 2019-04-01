import RangeSlider from '../js/rangeslider';

describe('RangeSlider', () => {

  describe('constructor', () => {
    it('должен быть функцией', () => {
      expect(typeof RangeSlider).toEqual('function');
    })
  })

  describe('slide', () => {
    it('должен один раз вызвать из модели методы startSlide, slide и finishSlide', () => {
      let fakeModel = {
        slide: function() {},
        startSlide: function() {},
        finishSlide: function() {}
      };
      let slide = spyOn(fakeModel, 'slide');
      let startSlide = spyOn(fakeModel, 'startSlide');
      let finishSlide = spyOn(fakeModel, 'finishSlide');
      let rangeslider = new RangeSlider(fakeModel);

      rangeslider.slide('from', 0);
      expect(slide).toHaveBeenCalledTimes(1);
      expect(startSlide).toHaveBeenCalledTimes(1);
      expect(finishSlide).toHaveBeenCalledTimes(1);
      expect(slide).toHaveBeenCalledWith(0);
      expect(startSlide).toHaveBeenCalledWith('from');

      slide.calls.reset();
      startSlide.calls.reset();
      finishSlide.calls.reset();

      rangeslider.slide('to', 1);
      expect(slide).toHaveBeenCalledTimes(1);
      expect(startSlide).toHaveBeenCalledTimes(1);
      expect(finishSlide).toHaveBeenCalledTimes(1);
      expect(slide).toHaveBeenCalledWith(1);
      expect(startSlide).toHaveBeenCalledWith('to');
    })
  })

  describe('update', () => {
    it('должен один раз вызвать из модели метод update', () => {
      let fakeModel = {update: function() {}};
      let update = spyOn(fakeModel, 'update');
      let rangeslider = new RangeSlider(fakeModel);

      rangeslider.update({});
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith({});

      update.calls.reset();

      rangeslider.update({a: 1});
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith({a: 1});
    })
  })

  describe('reset', () => {
    it('должен один раз вызвать из модели метод reset', () => {
      let fakeModel = {reset: function() {}};
      let reset = spyOn(fakeModel, 'reset');
      let rangeslider = new RangeSlider(fakeModel);
      rangeslider.reset();
      expect(reset).toHaveBeenCalledTimes(1);
    })
  })

})
