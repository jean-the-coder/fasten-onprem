import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationBarChartComponent } from './observation-bar-chart.component';
import { ObservationModel } from 'src/lib/models/resources/observation-model';
import { observationR4Factory } from 'src/lib/fixtures/factories/r4/resources/observation-r4-factory';
import { fhirVersions } from 'src/lib/models/constants';

describe('ObservationBarChartComponent', () => {
  let component: ObservationBarChartComponent;
  let fixture: ComponentFixture<ObservationBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ObservationBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationBarChartComponent);
    component = fixture.componentInstance;
    component.observations = [
      new ObservationModel(observationR4Factory.valueQuantity().build(), fhirVersions.R4),
      new ObservationModel(observationR4Factory.valueString().build(), fhirVersions.R4),
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
