import { codeableConceptR4Factory } from "src/lib/fixtures/factories/r4/datatypes/codeable-concept-r4-factory";
import { ObservationValueCodeableConceptModel } from "./codeable-concept-model";

describe('ObservationValueCodeableConceptModel', () => {
  it('should create an instance', () => {
    expect(new ObservationValueCodeableConceptModel({})).toBeTruthy();
  });

  describe('valueObject', () => {
    it('uses text if it is set', () => {
      let model = new ObservationValueCodeableConceptModel(codeableConceptR4Factory.text('Negative for Chlamydia Trachomatis rRNA').build());

      expect(model.valueObject).toEqual({ value: 'Negative for Chlamydia Trachomatis rRNA' });
    });

    it('uses the first coding display if text is not set', () => {
      let model = new ObservationValueCodeableConceptModel(codeableConceptR4Factory.coding({ display: 'Negative' }).build());

      expect(model.valueObject).toEqual({ value: 'Negative' });
    });

    it('does not error when data is malformed', () => {
      expect(new ObservationValueCodeableConceptModel({}).valueObject).toEqual({ value: null });
    });
  });
});
