import { Quantity } from 'fhir/r4';
import { ValueObject } from '../resources/observation-model';

// https://www.hl7.org/fhir/R4/datatypes.html#Quantity
// Also used for SimpleQuantity which is Quantity but with the rule that 'comparator' should not be set
export class QuantityModel implements Quantity {
  value?: number
  comparator?: '<' | '<=' | '>=' | '>'
  unit?: string
  system?: string
  code?: string
  valueObject: ValueObject

  constructor(fhirData: any) {
    this.value = fhirData['value'];
    this.comparator = fhirData['comparator'];
    this.unit = fhirData['unit'];
    this.system = fhirData['system'];
    this.code = fhirData['code'];
    this.valueObject = this.parseValue();
  }

  visualizationTypes(): string[] {
    return ['bar', 'table'];
  }

  hasValue(): boolean {
    return !!this.value;
  }

  display(): string {
    return [this.comparator, this.value, this.unit].join(' ')
  }

  private parseValue(): {} {
    switch (this.comparator) {
      case '<':
      case '<=':
        return { range: { low: null, high: this.value } };
      case '>':
      case '>=':
        return { range: { low: this.value, high: null } };
      default:
        return { value: this.value }
    }
  }
}
