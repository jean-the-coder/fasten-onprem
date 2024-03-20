import { ObservationValueBooleanModel } from "./boolean-model";

describe('ObservationValueBooleanModel', () => {
  it('should create an instance', () => {
    expect(new ObservationValueBooleanModel(false)).toBeTruthy();
  });

  it('sets valueObject correctl', () => {
    let model = new ObservationValueBooleanModel(true);
    let model2 = new ObservationValueBooleanModel(false);

    expect(model.valueObject).toEqual({ value: true });
    expect(model2.valueObject).toEqual({ value: false });
  });
});
