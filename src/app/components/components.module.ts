import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementatorComponent } from './incrementator/incrementator.component';
import { DoughnutComponent } from './doughnut/doughnut.component';



@NgModule({
  declarations: [IncrementatorComponent, DoughnutComponent],
  exports: [IncrementatorComponent, DoughnutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
