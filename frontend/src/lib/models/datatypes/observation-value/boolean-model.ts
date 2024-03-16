import { ValueObject } from "../../resources/observation-model";

export class ObservationValueBooleanModel {
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
