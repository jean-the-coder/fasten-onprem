import { CodeableConcept, Coding } from "fhir/r4";
import { ValueObject } from "../../resources/observation-model";
import { ObservationValueCodeableConceptModel } from "./codeable-concept-model";

// Technically not its own fhir datatype. But for observations, either a value or dataAbsentReason
// should be set. So this is a wrapper to provide the same value functionality with a custom display string to
// ensure that data provided to the user is clearer.
export class ObservationValueDataAbsentReasonModel extends ObservationValueCodeableConceptModel {
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
