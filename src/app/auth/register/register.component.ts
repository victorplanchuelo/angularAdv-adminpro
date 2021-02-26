import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  public formSubmitter = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido1: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  } , {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  crearUsuario(): void {
    this.formSubmitter = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( resp => {
        console.log('usuario creado');
        console.log(resp);
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo: string): boolean {
    return (this.registerForm.get(campo)?.invalid && this.formSubmitter) ? true : false;
  }

  aceptarTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitter;
  }

  passwordsNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return (pass1 !== pass2 && this.formSubmitter) ? true : false;
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Ctrl = formGroup.get(pass1);
      const pass2Ctrl = formGroup.get(pass2);

      if (pass1Ctrl?.value === pass2Ctrl?.value) {
        pass2Ctrl?.setErrors(null);
      }
      else {
        pass2Ctrl?.setErrors({ noEsIgual: true});
      }
    };
  }


}
