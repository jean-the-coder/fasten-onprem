import { CodeableConcept } from "fhir/r4";
import { ValueObject } from "../../resources/observation-model";

export class ObservationValueCodeableConceptModel {
  source: CodeableConcept
  // valueObject: ValueObject

  constructor(value: CodeableConcept) {
    this.source = value;
    // this.valueObject = { value: value }
  }

  visualizationTypes(): string[] {
    return ['table'];
  }

  display(): string {
    return this.source.text;
  }

}
