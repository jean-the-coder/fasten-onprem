import { ObservationValue, ValueObject } from "../../resources/observation-model";

export class ObservationValueIntegerModel implements ObservationValue {
  soruceValue: number
  valueObject: ValueObject

  constructor(value: number) {
    this.soruceValue = value;
    this.valueObject = { value: value }
  }

  visualizationTypes(): string[] {
    return ['bar', 'table'];
  }

  display(): string {
    return this.soruceValue.toString();
  }

}
