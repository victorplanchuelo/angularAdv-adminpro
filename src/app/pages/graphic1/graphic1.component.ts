import { Component } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component{

  public labels1: string[] = ['Carne', 'Pescado', 'Agua']
  public data1 = [
    [10, 23, 48]
  ];
}
