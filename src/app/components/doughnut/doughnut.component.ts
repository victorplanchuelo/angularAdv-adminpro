import { Component, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent{

  @Input() title = 'Sin título';
  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [25, 25, 40]
  ];

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ];

}
