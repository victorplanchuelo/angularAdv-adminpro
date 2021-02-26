import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

    ////////////////////////////////////////////////////////
  // Vamos por el Video 16 (apartado 14). Usar el Token de Google para autenticarnos
  ////////////////////////////////////////////////////////

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  public email!: string;
  public auth2: any;

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone) { }
  ngOnInit(): void {
    const email = localStorage.getItem('email') || '';
    this.loginForm.setValue(
      {
        email,
        password: '',
        remember: (email.length > 1)
      }
    );

    this.renderButton();
  }

  login(): void {
    // console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => this.router.navigateByUrl('/')
    , (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  // console.log(googleUser.getAuthResponse().id_token);


  renderButton(): void {
    gapi.signin2.render
    (
      'my-signin2',
      {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark'
      }
    );

    this.startApp();
  }

  async startApp(): Promise<void> {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any): void {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token)
            .subscribe(resp => {
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              });
            });
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
