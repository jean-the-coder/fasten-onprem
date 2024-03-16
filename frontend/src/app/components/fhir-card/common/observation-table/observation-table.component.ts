import { Component, Input, OnInit } from '@angular/core';
import { ObservationModel } from '../../../../../lib/models/resources/observation-model';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  selector: 'observation-table',
  imports: [ NgChartsModule ],
  templateUrl: './observation-table.component.html',
  styleUrls: ['./observation-table.component.scss']
})
export class ObservationTableComponent implements OnInit {
  @Input() observations: [ObservationModel]

  constructor() { }

  ngOnInit(): void {
    if(!this.observations || !this.observations[0]) {
      return;
    }


  }
}
