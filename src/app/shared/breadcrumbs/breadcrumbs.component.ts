import { Component, OnDestroy } from '@angular/core';
import { Event, ActivationEnd, Router, Data } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo = '';
  public tituloSubs$: Subscription;

  constructor( private router: Router) {

    this.tituloSubs$ = this.getArgumentosRuta()
                      .subscribe( ( {title} ) => {
                        this.titulo = title;
                        document.title = `AdminPro - ${title}`;
                      });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(): Observable<Data> {
    return this.router.events
    .pipe(
      filter((event: Event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data)
    );
  }
}
