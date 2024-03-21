import { ObservationValue, ValueObject } from "../../resources/observation-model";

export class ObservationValueBooleanModel implements ObservationValue {
  source: boolean
  valueObject: ValueObject

  constructor(value: boolean) {
    this.source = value;
    this.valueObject = { value: value }
  }

  visualizationTypes(): string[] {
    return ['table'];
  }

  display(): string {
    return this.source.toString();
  }

}
