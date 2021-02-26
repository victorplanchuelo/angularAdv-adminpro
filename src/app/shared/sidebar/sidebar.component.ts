import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] | undefined;

  constructor(private sidebarService: SidebarService,
              private usuarioService: UsuarioService,
              private router: Router) {
    this.menuItems = sidebarService.menu;
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

}
