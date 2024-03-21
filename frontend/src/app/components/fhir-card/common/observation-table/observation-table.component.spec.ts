import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationTableComponent } from './observation-table.component';
import { ObservationModel } from 'src/lib/models/resources/observation-model';
import { observationR4Factory } from 'src/lib/fixtures/factories/r4/resources/observation-r4-factory';
import { fhirVersions } from 'src/lib/models/constants';

describe('ObservationTableComponent', () => {
  let component: ObservationTableComponent;
  let fixture: ComponentFixture<ObservationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ObservationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationTableComponent);
    component = fixture.componentInstance;
    component.observations = [
      new ObservationModel(observationR4Factory.valueQuantity().build(), fhirVersions.R4),
      new ObservationModel(observationR4Factory.valueCodeableConcept().build(), fhirVersions.R4),
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
