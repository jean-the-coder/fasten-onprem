import { CodeableConcept, Coding } from "fhir/r4";
import { ValueObject } from "../../resources/observation-model";
import { ObservationValueCodeableConceptModel } from "./codeable-concept-model";

// Technically not its own fhir datatype. But for observations, either a value or dataAbsentReason
// should be set. This is a wrapper around ObservationValueCodeableConceptModel to hopefully add a little
// clarity to the display string. Seems like some of the reasons given are things like "Unknown" and "Error".
// This makes it so "(data absent)" is appended to the string.
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
