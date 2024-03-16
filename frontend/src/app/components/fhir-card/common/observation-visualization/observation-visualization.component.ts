import { Component, Input, OnInit } from '@angular/core';
import { ObservationModel } from '../../../../../lib/models/resources/observation-model';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  selector: 'observation-visualization',
  imports: [ NgChartsModule ],
  templateUrl: './observation-visualization.component.html',
  styleUrls: ['./observation-visualization.component.scss']
})
export class ObservationVisualizationComponent implements OnInit {
  @Input() observations: [ObservationModel]
  @Input() preferredVisualizationType?: string

  visualizationType: string = ''

  constructor() { }

  ngOnInit(): void {
    if(!this.observations || !this.observations[0]) {
      return;
    }


  }
}
