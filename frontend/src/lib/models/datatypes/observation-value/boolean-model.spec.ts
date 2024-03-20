import { ObservationValueBooleanModel } from "./boolean-model";

describe('ObservationValueBooleanModel', () => {
  it('should create an instance', () => {
    expect(new ObservationValueBooleanModel(false)).toBeTruthy();
  });

  it('returns the correct visualization types', () => {
    expect(new ObservationValueBooleanModel(false).visualizationTypes()).toEqual(['table']);
  });

  it('sets valueObject correctl', () => {
    let model = new ObservationValueBooleanModel(true);
    let model2 = new ObservationValueBooleanModel(false);

    expect(model.valueObject).toEqual({ value: true });
    expect(model2.valueObject).toEqual({ value: false });
  });

  it ('returns correct display', () => {
    let model = new ObservationValueBooleanModel(true);
    let model2 = new ObservationValueBooleanModel(false);

    expect(model.display()).toEqual('true');
    expect(model2.display()).toEqual('false');
  });
});
