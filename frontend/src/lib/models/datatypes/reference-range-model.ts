import * as _ from "lodash";
import { RangeModel } from "./range-model";
import { CodeableConcept, ObservationReferenceRange, Quantity, Range, RatioRange } from "fhir/r4";

// https://www.hl7.org/fhir/R4/observation-definitions.html#Observation.referenceRange
// Must have high or low or text
export class ReferneceRangeModel implements ObservationReferenceRange {
  low?: Quantity
  high?: Quantity
  type?: CodeableConcept
  appliesTo?: CodeableConcept[]
  age?: RatioRange
  text: string

  constructor(fhirData: any) {
    this.low = _.get(fhirData, 'low', null);
    this.high = _.get(fhirData, 'high', null);
    this.type = _.get(fhirData, 'type', null);
    this.appliesTo = _.get(fhirData, 'appliesTo', null);
    this.age = _.get(fhirData, 'age', null);
    this.text = _.get(fhirData, 'text', null);
  }

  display(): string {
    return this.text || new RangeModel({low: this.low, high: this.high}).display()
  }

  chartableReferenceRange(): { low?: number, high?: number} {
    if (this.low || this.high) {
      return { low: this.low.value, high: this.high.value }
    }

    let matches = this.text?.match(/(?<value1>[\d.]*)?(?<operator>[^\d]*)?(?<value2>[\d.]*)?/)

    if(!matches) {
      return { low: null, high: null }
    }

    if (!!matches.groups['value1'] && !!matches.groups['value2']) {
      return {
        low: parseFloat(matches.groups['value1']),
        high: parseFloat(matches.groups['value2'])
      }
    }

    if (['<', '<='].includes(matches.groups['operator'])) {
      return {
        low: null,
        high: parseFloat(matches.groups['value2'])
      }
    } else { // > >=
      return {
        low: parseFloat(matches.groups['value2']),
        high: null
      }
    }
  }
}
