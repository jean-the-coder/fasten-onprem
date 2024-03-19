import { Quantity, Range } from "fhir/r4";
import { QuantityModel } from "./quantity-model";

export class RangeModel implements Range {
  low?: Quantity
  high?: Quantity

  constructor(fhirData: any) {
    this.low = new QuantityModel(fhirData['low']);
    this.high = new QuantityModel(fhirData['high']);
  }

  display(unit?: string): string {
    if (this.low.value && this.high.value) {
      return [this.low.value, '\u{2013}', this.high.value, unit].join(' ').trim();
    } else if (this.low.value) {
      return ['>', this.low.value, unit].join(' ').trim();
    } else if (this.high.value) {
      return ['>', this.high.value, unit].join(' ').trim();
    }

    return '';
  }
}
