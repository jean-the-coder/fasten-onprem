import { Component, Input, OnInit } from '@angular/core';
import { ObservationModel } from '../../../../../lib/models/resources/observation-model';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  standalone: true,
  selector: 'observation-table',
  imports: [ CommonModule ],
  templateUrl: './observation-table.component.html',
  styleUrls: ['./observation-table.component.scss']
})
export class ObservationTableComponent implements OnInit {
  @Input() observations: [ObservationModel]

  tableData = []

  constructor() { }

  ngOnInit(): void {
    if(!this.observations || !this.observations[0]) {
      return;
    }

    for (let observation of this.observations) {
      let date = ''
      if (observation.effective_date) {
        date = formatDate(observation.effective_date, "mediumDate", "en-US", undefined);
      } else {
        date = 'Unknown date';
      }

      this.tableData.push(
        {
          date: date,
          value: observation.value_model.display()
        }
      )
    }

  }
}
