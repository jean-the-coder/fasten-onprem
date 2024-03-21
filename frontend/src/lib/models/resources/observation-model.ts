import {fhirVersions, ResourceType} from '../constants';
import _ from "lodash";
import {CodableConceptModel} from '../datatypes/codable-concept-model';
import {ReferenceModel} from '../datatypes/reference-model';
import {FastenDisplayModel} from '../fasten/fasten-display-model';
import {FastenOptions} from '../fasten/fasten-options';
import { QuantityModel } from '../datatypes/quantity-model';
import { ObservationValueStringModel } from '../datatypes/observation-value/string-model';
import { ObservationValueIntegerModel } from '../datatypes/observation-value/integer-model';
import { ObservationValueBooleanModel } from '../datatypes/observation-value/boolean-model';
import { ObservationValueCodeableConceptModel } from '../datatypes/observation-value/codeable-concept-model';
import { ReferenceRangeModel } from '../datatypes/reference-range-model';
import { DataAbsentReasonModel } from '../datatypes/data-absent-reason-model';

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
    this.code = new CodableConceptModel(_.get(fhirResource, 'code'));
    this.code_coding_display = _.get(fhirResource, 'code.coding.0.display');
    this.code_text = _.get(fhirResource, 'code.text', '');
    this.status = _.get(fhirResource, 'status', '');
    this.subject = _.get(fhirResource, 'subject');
    this.reference_range = new ReferenceRangeModel(_.get(this.fhirResource, 'referenceRange.0'))

    // TODO: there are more value types that can be set: valueRange, valueRatio, valueSampledData, valueTime, valueDateTime, valuePeriod
    // TODO: It is possible for values to be set in the Component element instead of any value component from above. Figure out what to do for that
    if (_.get(fhirResource, 'valueQuantity')) { this.value_model = new QuantityModel(fhirResource['valueQuantity']) }
    if (_.get(fhirResource, 'valueString')) { this.value_model = new ObservationValueStringModel(fhirResource['valueString']) }
    if (_.get(fhirResource, 'valueInteger')) { this.value_model = new ObservationValueIntegerModel(fhirResource['valueInteger']) }
    if (_.get(fhirResource, 'valueBoolean')) { this.value_model = new ObservationValueBooleanModel(fhirResource['valueBoolean']) }
    if (_.get(fhirResource, 'valueCodeableConcept')) { this.value_model = new ObservationValueCodeableConceptModel(fhirResource['valueCodeableConcept']) }
    if (_.get(fhirResource, 'dataAbsentReason')) { this.value_model = new DataAbsentReasonModel(fhirResource['dataAbsentReason']) }
  }
}
