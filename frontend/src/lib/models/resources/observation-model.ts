import {fhirVersions, ResourceType} from '../constants';
import * as _ from "lodash";
import {CodableConceptModel} from '../datatypes/codable-concept-model';
import {ReferenceModel} from '../datatypes/reference-model';
import {FastenDisplayModel} from '../fasten/fasten-display-model';
import {FastenOptions} from '../fasten/fasten-options';
import { QuantityModel } from '../datatypes/quantity-model';
import { ObservationValueStringModel } from '../datatypes/observation-value/string-model';
import { ObservationValueIntegerModel } from '../datatypes/observation-value/integer-model';
import { ObservationValueBooleanModel } from '../datatypes/observation-value/boolean-model';
import { ObservationValueCodeableConceptModel } from '../datatypes/observation-value/codeable-concept-model';

// should have one or the other
export interface ValueObject {
  range?: { low?: number | null, high?: number | null }
  value?: number | string | boolean | null
}

// https://www.hl7.org/fhir/R4/observation.html
export class ObservationModel extends FastenDisplayModel {
  code: CodableConceptModel | undefined
  effective_date: string
  code_coding_display: string
  code_text: string
  value_quantity_unit: string
  status: string
  subject: ReferenceModel | undefined
  fhirResource: any
  reference_range: any

  value_model: QuantityModel | ObservationValueStringModel | ObservationValueIntegerModel | ObservationValueBooleanModel | ObservationValueCodeableConceptModel

  constructor(fhirResource: any, fhirVersion?: fhirVersions, fastenOptions?: FastenOptions) {
    super(fastenOptions)
    this.fhirResource = fhirResource
    this.source_resource_type = ResourceType.Observation
    this.effective_date = _.get(fhirResource, 'effectiveDateTime');
    this.code = new CodableConceptModel(fhirResource['code']);
    this.code_coding_display = _.get(fhirResource, 'code.coding.0.display');
    this.code_text = _.get(fhirResource, 'code.text', '');

    if (fhirResource['valueQuantity']) { this.value_model = new QuantityModel(fhirResource['valueQuantity']) }
    if (fhirResource['valueString']) { this.value_model = new ObservationValueStringModel(fhirResource['valueString']) }
    if (fhirResource['valueInteger']) { this.value_model = new ObservationValueIntegerModel(fhirResource['valueInteger']) }
    if (fhirResource['valueBoolean']) { this.value_model = new ObservationValueBooleanModel(fhirResource['valueBoolean']) }
    if (fhirResource['valueCodeableConcept']) { this.value_model = new ObservationValueCodeableConceptModel(fhirResource['valueCodeableConcept']) }
    // TODO: there are more value types that can be set: valueRange, valueRatio, valueSampledData, valueTime, valueDateTime, valuePeriod
    // TODO: It is possible for values to be set in the Component element instead of any value component from above. Figure out what to do for that

    this.value_quantity_unit = this.parseUnit();
    this.status = _.get(fhirResource, 'status', '');

    this.reference_range = this.parseReferenceRange();
    this.subject = _.get(fhirResource, 'subject');
  }

  private parseUnit(): string {
    return this.valueUnit() || this.valueStringUnit()
  }

  // Look for the observation's numeric value. Use this first before valueStringUnit which is a backup if this can't be found.
  private valueUnit(): string {
    return _.get(this.fhirResource, "valueQuantity.unit");
  }

  // Use if valueUnit can't be found.
  private valueStringUnit(): string {
    return _.get(this.fhirResource, "valueString")?.match(/(?<value>[\d.]*)(?<text>.*)/).groups.text;
  }

  private referenceRangeFromString(str: string): any {
    let matches = str?.match(/(?<value1>[\d.]*)?(?<operator>[^\d]*)?(?<value2>[\d.]*)?/)

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

  private parseReferenceRange(): {} {
    let refRangeObject = _.get(this.fhirResource, "referenceRange.0")

    if (refRangeObject?.low || refRangeObject?.high) {
      return {
        low: refRangeObject.low?.value,
        high: refRangeObject.high?.value
      }
    }

    return this.referenceRangeFromString(refRangeObject?.text)
  }

  public referenceRangeDisplay(): string {
    // If text was sent just show it since we aren't storing difference between <= and <.
    // Likely doesn't really matter, but might as well if we have that data.
    if (_.get(this.fhirResource, 'referenceRange.0.text')) {
      return _.get(this.fhirResource, 'referenceRange.0.text');
    }

    let refRange = this.parseReferenceRange()

    if (refRange['low'] && refRange['high']) {
      return `${refRange['low']}\u{2013}${refRange['high']}`;
    } else if (refRange['low']) {
      return `> ${refRange['low']}`;
    } else if (refRange['high']) {
      return `< ${refRange['high']}`;
    }

    return '';
  }
}
