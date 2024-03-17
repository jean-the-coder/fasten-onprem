import { Component, Input, OnInit } from '@angular/core';
import { ObservationModel } from '../../../../../lib/models/resources/observation-model';
import { CommonModule } from '@angular/common';
import { ObservationBarChartComponent } from '../observation-bar-chart/observation-bar-chart.component';
import { ObservationTableComponent } from '../observation-table/observation-table.component';

@Component({
  standalone: true,
  selector: 'observation-visualization',
  imports: [ CommonModule, ObservationBarChartComponent, ObservationTableComponent ],
  templateUrl: './observation-visualization.component.html',
  styleUrls: ['./observation-visualization.component.scss']
})
export class ObservationVisualizationComponent implements OnInit {
  @Input() observations: [ObservationModel]
  @Input() preferredVisualizationType?: string = 'bar'

  visualizationType: string = ''

  constructor() { }

  ngOnInit(): void {
    if(!this.observations || !this.observations[0]) {
      return;
    }

    if (this.preferredVisualizationType && this.observations[0].value_model?.visualizationTypes().includes(this.preferredVisualizationType)) {
      this.visualizationType = this.preferredVisualizationType;
    } else {
      this.visualizationType = this.observations[0].value_model.visualizationTypes()[0];
    }
  }
}
