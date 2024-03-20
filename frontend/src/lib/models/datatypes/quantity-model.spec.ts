import { quantityR4Factory } from "src/lib/fixtures/factories/r4/datatypes/quantity-r4-factory";
import { QuantityModel } from "./quantity-model";

describe('QuantityModel', () => {
  it('should create an instance', () => {
    expect(new QuantityModel({})).toBeTruthy();
  });

  describe('valueObject', () => {
    it('sets value if there is no comparator', () => {
      let quantity = new QuantityModel(quantityR4Factory.value(6.3).build());

      expect(quantity.valueObject).toEqual({ value: 6.3 });
    });

    it('sets range correctly if there is a comparator', () => {
      let quantity = new QuantityModel(quantityR4Factory.value(8).comparator('<').build());
      let quantity2 = new QuantityModel(quantityR4Factory.value(8).comparator('>').build());

      expect(quantity.valueObject).toEqual({ range: { low: null, high: 8 } });
      expect(quantity2.valueObject).toEqual({ range: { low: 8, high: null } });
    });
  });

});
