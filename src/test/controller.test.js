import Controller from '../js/controller';

describe('Controller', () => {
  describe('constructor', () => {
    it('должен быть функцией', () => {
      expect(typeof Controller).toEqual('function');
    });
  });
});
