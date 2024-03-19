import { CodeableConcept } from "fhir/r4";

export class ObservationValueCodeableConceptModel {
  source: CodeableConcept

  constructor(value: CodeableConcept) {
    this.source = value;
  }

  visualizationTypes(): string[] {
    return ['table'];
  }

  display(): string {
    return this.source.text;
  }

}
