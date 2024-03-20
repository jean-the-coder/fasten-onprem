
import { ObservationValueStringModel } from "./string-model";

  describe('ObservationValueStringModel', () => {
    it('should create an instance', () => {
      expect(new ObservationValueStringModel('')).toBeTruthy();
    });

    describe('valueObject', () => {
      it('sets value if there is no comparator', () => {
        let quantity = new ObservationValueStringModel('6.3 IntlUnit/mL');

        expect(quantity.valueObject).toEqual({ value: 6.3 });
      });

      it('sets range correctly if there is a comparator', () => {
        let stringQuantity = new ObservationValueStringModel('<10 IntlUnit/mL');
        let stringQuantity2 = new ObservationValueStringModel('>10 IntlUnit/mL');

        expect(stringQuantity.valueObject).toEqual({ range: { low: null, high: 10 } });
        expect(stringQuantity2.valueObject).toEqual({ range: { low: 10, high: null } });
      });
    });
  });
