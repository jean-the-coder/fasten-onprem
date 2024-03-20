import { ObservationValueIntegerModel } from "./integer-model";

  describe('ObservationValueIntegerModel', () => {
    it('should create an instance', () => {
      expect(new ObservationValueIntegerModel(5)).toBeTruthy();
    });

    it('sets valueObject correctl', () => {
      let model = new ObservationValueIntegerModel(6.3);

      expect(model.valueObject).toEqual({ value: 6.3 });
    });
  });
