import { ValueObject } from "../../resources/observation-model";

export class ObservationValueStringModel {
  sourceString: string
  valueObject: ValueObject

  constructor(str: string) {
    this.sourceString = str;
    this.valueObject = this.parseValueString();
  }

  visualizationTypes(): string[] {
    if (this.valueObject.range || Number.isFinite(this.valueObject.value)) {
      return ['bar', 'table'];
    }

    return ['table'];
  }

  display(): string {
    return this.sourceString;
  }

  private parseValueString(): {} {
    let matches = this.sourceString?.match(/(?<value1>[\d.]*)?(?<operator>[^\d]*)?(?<value2>[\d.]*)?/)

    if(!matches) {
      return { range: { low: null, high: null } }
    }

    if (!!matches.groups['value1'] && !!matches.groups['value2']) {
      return {
        range: {
          low: parseFloat(matches.groups['value1']),
          high: parseFloat(matches.groups['value2'])
        }
      }
    }

    if (['<', '<='].includes(matches.groups['operator'])) {
      return {
        range: {
          low: null,
          high: parseFloat(matches.groups['value2'])
        }
      }
    } else if (['>', '>='].includes(matches.groups['operator'])) {
      return {
        range: {
          low: parseFloat(matches.groups['value2']),
          high: null
        }
      }
    }
    let float = parseFloat(matches.groups['value1']);

    if (Number.isNaN(float)) {
      return { value: matches.groups['value1'] }
    }

    return { value: float };
  }

}
