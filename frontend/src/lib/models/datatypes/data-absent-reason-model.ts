import { CodeableConcept, Coding } from "fhir/r4";
import { ValueObject } from "../resources/observation-model";
import { ObservationValueCodeableConceptModel } from "./observation-value/codeable-concept-model";

export class DataAbsentReasonModel extends ObservationValueCodeableConceptModel {
  source: CodeableConcept
  coding?: Coding[]
  text?: string
  valueObject: ValueObject

  constructor(fhirData: any) {
    super(fhirData)
  }

  display(): string {
    return `${this.valueObject.value?.toString() || ''} (data absent)`.trim();
  }
}
