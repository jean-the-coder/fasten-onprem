import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationVisualizationComponent } from './observation-visualization.component';
import { ObservationModel } from 'src/lib/models/resources/observation-model';
import { observationR4Factory } from 'src/lib/fixtures/factories/r4/resources/observation-r4-factory';
import { fhirVersions } from 'src/lib/models/constants';

describe('ObservationVisualizationComponent', () => {
  let component: ObservationVisualizationComponent;
  let fixture: ComponentFixture<ObservationVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ObservationVisualizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationVisualizationComponent);
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
