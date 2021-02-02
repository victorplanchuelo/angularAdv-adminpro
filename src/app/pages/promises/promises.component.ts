import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*const promesa = new Promise(( resolve, reject ) => {
      if(false) {
        resolve('Heyyyy');
      } else {
        reject('algo salio mal');
      }
    });

    promesa.then((msj) => {
      console.log(msj);
    })
    .catch(err => console.log('Algo salio mas en la promise', err));

    console.log('Fin del onInit');
    */

    //this.getUsuarios();

     this.getUsuarios().then( usuarios => console.log(usuarios) );
  }

  getUsuarios(): Promise<any> {
    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then(respuesta => respuesta.json())
        .then(body => resolve(body.data));

    });
  }

}
