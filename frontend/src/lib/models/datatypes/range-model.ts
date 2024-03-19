import { Quantity, Range } from "fhir/r4";
import * as _ from "lodash";

export class RangeModel implements Range {
  low?: Quantity
  high?: Quantity

  constructor(fhirData: any) {
    this.low = _.get(fhirData, 'low', null);
    this.high = _.get(fhirData, 'high', null);
  }

  display(unit?: string): string {
    if (this.low && this.high) {
      return [this.low, '\u{2013}', this.high, unit].join(' ').trim();
    } else if (this.low) {
      return ['>', this.low, unit].join(' ').trim();
    } else if (this.high) {
      return ['>', this.high, unit].join(' ').trim();
    }

    return '';
  }
}
