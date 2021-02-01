import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styles: [
  ]
})
export class IncrementatorComponent implements OnInit {
  // Si quisieramos renombrar la variable que lleva el valor sería
   // tslint:disable-next-line: no-input-rename
   @Input('initialValue') progreso = 50;
  // Con esto el padre tendría que hacer un [initialValue]="15" para que funcionara
  @Input() btnClass = 'btn-primary';

  // @Input() progreso = 50;

  @Output() valueEmmited: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number): number {
    if (this.progreso >= 100 && valor >= 0) {
      this.valueEmmited.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.valueEmmited.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valueEmmited.emit(this.progreso);
    return this.progreso;
  }

  onChange(nuevoValor: number): void {
    if(nuevoValor >= 100) {
      this.progreso = 100;
    }
    else if (nuevoValor <= 0) {
      this.progreso = 0;
    }
    else {
      this.progreso = nuevoValor;
    }

    this.valueEmmited.emit(this.progreso);
  }

}
