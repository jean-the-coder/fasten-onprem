import { ObservationModel } from './observation-model';
import { fhirVersions } from '../constants';
import { observationR4Factory } from 'src/lib/fixtures/factories/r4/resources/observation-r4-factory';
import { QuantityModel } from '../datatypes/quantity-model';
import { ObservationValueStringModel } from '../datatypes/observation-value/string-model';
import { ObservationValueIntegerModel } from '../datatypes/observation-value/integer-model';
import { ObservationValueBooleanModel } from '../datatypes/observation-value/boolean-model';
import { ObservationValueCodeableConceptModel } from '../datatypes/observation-value/codeable-concept-model';
import { ReferenceRangeModel } from '../datatypes/reference-range-model';

describe('ObservationModel', () => {
  it('should create an instance', () => {
    expect(new ObservationModel({})).toBeTruthy();
  });

  it('sets reference_range', () => {
    expect(new ObservationModel({}).reference_range).toBeInstanceOf(ReferenceRangeModel);
  });

  describe('value_model', () => {
    it('is null if there is no value setting', () => {
      expect(new ObservationModel({}).value_model).toBeFalsy();
    });

    it('is a QuantityModel if valueQuantity is set', () => {
      let observation = new ObservationModel(observationR4Factory.valueQuantity().build(), fhirVersions.R4);

      expect(observation.value_model).toBeInstanceOf(QuantityModel);
    });

    it('is a ObservationValueStringModel if valueString is set', () => {
      let observation = new ObservationModel(observationR4Factory.valueString().build(), fhirVersions.R4);

      expect(observation.value_model).toBeInstanceOf(ObservationValueStringModel);
    });

    it('is a ObservationValueIntegerModel if valueInteger is set', () => {
      let observation = new ObservationModel(observationR4Factory.valueInteger().build(), fhirVersions.R4);

      expect(observation.value_model).toBeInstanceOf(ObservationValueIntegerModel);
    });

    it('is a ObservationValueBooleanModel if valueBoolean is set', () => {
      let observation = new ObservationModel(observationR4Factory.valueBoolean().build(), fhirVersions.R4);

      expect(observation.value_model).toBeInstanceOf(ObservationValueBooleanModel);
    });

    it('is a ObservationValueCodeableConceptModel if valueCodeableConcept is set', () => {
      let observation = new ObservationModel(observationR4Factory.valueCodeableConcept().build(), fhirVersions.R4);

      expect(observation.value_model).toBeInstanceOf(ObservationValueCodeableConceptModel);
    });
  });
  // describe('parsing value', () => {
  //   it('reads from valueQuantity.value if set', () => {
  //     let observation = new ObservationModel(observationR4Factory.build(), fhirVersions.R4);
  //   expect(observation.value_object.value).toEqual(6.3);
  // });

  // it('parses valueString correctly when value is a number if valueQuantity.value not set', () => {
  //   let observation = new ObservationModel(observationR4Factory.valueString().build(), fhirVersions.R4);

  //   expect(observation.value_object.value).toEqual(5.5);
  // });

  // it('parses value correctly when valueQuantity.comparator is set', () => {
  //   let observation = new ObservationModel(observationR4Factory.valueQuantity({ comparator: '<', value: 8 }).build(), fhirVersions.R4);
  //   let observation2 = new ObservationModel(observationR4Factory.valueQuantity({ comparator: '>', value: 8 }).build(), fhirVersions.R4);

  //   expect(observation.value_object).toEqual({ range: { low: null, high: 8 } });
  //   expect(observation2.value_object).toEqual({ range: { low: 8, high: null } });
  // });

  // it('parses value correctly when valueString has a range', () => {
  //   let observation = new ObservationModel(observationR4Factory.valueString('<10 IntlUnit/mL').build(), fhirVersions.R4);
  //   let observation2 = new ObservationModel(observationR4Factory.valueString('>10 IntlUnit/mL').build(), fhirVersions.R4);

  //   expect(observation.value_object).toEqual({ range: { low: null, high: 10 } });
  //   expect(observation2.value_object).toEqual({ range: { low: 10, high: null } });
  // });

  // // following two tests being kept temporarily. will be removed in next PR when I remove value_quantity_value
  // it('reads from valueQuantity.value if set', () => {
  //   let observation = new ObservationModel(observationR4Factory.build(), fhirVersions.R4);

  //   expect(observation.value_quantity_value).toEqual(6.3);
  // });

  //   it('parses valueString correctly when value is a number if valueQuantity.value not set', () => {
  //     let observation = new ObservationModel(observationR4Factory.valueString().build(), fhirVersions.R4);

  //     expect(observation.value_quantity_value).toEqual(5.5);
  //   });
  // });


  // describe('parsing unit', () => {
  //   it('reads from valueQuantity.unit if set', () => {
  //     let observation = new ObservationModel(observationR4Factory.build(), fhirVersions.R4);

  //     expect(observation.value_quantity_unit).toEqual('mmol/l');
  //   });

  //   it('reads from valueString if valueQuantity.unit not set', () => {
  //     let observation = new ObservationModel(observationR4Factory.valueString().build(), fhirVersions.R4);

  //     expect(observation.value_quantity_unit).toEqual('mmol/l');
  //   });
  // });
});
