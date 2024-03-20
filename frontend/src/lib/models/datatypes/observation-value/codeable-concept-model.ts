import { CodeableConcept, Coding } from "fhir/r4";
import { ValueObject } from "../../resources/observation-model";

export class ObservationValueCodeableConceptModel {
  source: CodeableConcept
  coding?: Coding[]
  text?: string
  valueObject: ValueObject

  constructor(fhirData: any) {
    this.source = fhirData;
    this.coding = fhirData.coding
    this.text = fhirData.text
    this.valueObject = this.parse()
  }

  visualizationTypes(): string[] {
    return ['table'];
  }

  display(): string {
    return this.valueObject.value?.toString() || '';
  }

  private parse() {
    if (this.text) {
      return { value: this.text }
    }

    if (!this.coding) {
      return { value: null }
    }

    return { value: this.coding[0].display }
  }
}
