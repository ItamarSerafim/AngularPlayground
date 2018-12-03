import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  VERSION
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Link, LinkService } from './core/site-navigation/link.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnInit {
  title = 'Learning Angular by Example.';
  events: string[] = [];
  opened = true;
  sideNavConfig = {
    opened: false,
    icons: { hidden: false },
    labels: { hidden: false },
    mode: 'side'
  };
  ngVersion = VERSION.full ;
  fixedToTop: boolean;
  sideNavLinks: Link[];

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private linkService: LinkService
  ) {
    router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationEnd) {
          if (this.sidenav.mode === 'over') {
            this.sidenav.close();
          }
      }

  });
  }

  ngOnInit() {

    this.linkService
      .get({params: {sort: 'order,asc', filter: 'showAt eq side-menu'}})
      .subscribe((links: Link[]) => {
        this.sideNavLinks = links;
      },
      error => console.log(error));
  }

  ngAfterContentInit() {

    this.breakpointObserver.observe([
      '(max-width:  599px)',
      '(min-width: 1024px)',
      '(min-width: 600px) and (max-width: 1023px)'
    ]).subscribe(result => {
      if (result.matches) {
        if ( result.breakpoints['(max-width:  599px)']) {
          this.sideNavConfig = {
            opened: false,
            icons: { hidden: false },
            labels: { hidden: false },
            mode: 'over'
          };
        } else if (result.breakpoints['(min-width: 600px) and (max-width: 1023px)']) {
          this.sideNavConfig = {
            opened: true,
            icons: { hidden: false },
            labels: { hidden: true},
            mode: 'side'
          };
        } else if (result.breakpoints['(min-width: 1024px)']) {
          this.sideNavConfig = {
            opened: true,
            icons: { hidden: false },
            labels: { hidden: false },
            mode: 'side'
          };
        }
        console.log('this.sideNavConfig: ', this.sideNavConfig);
        this.sidenav.close().then(() => {
              this.opened = this.sideNavConfig.opened;
        });
      }
    });
    document.body.addEventListener('scroll', event => {
      if (document.body.scrollTop > 10) {
        this.fixedToTop = true;
      } else {
        this.fixedToTop = false;
      }
    });
  }

  toggleLabels() {
    let taFechando = false;
    if (!this.sideNavConfig.labels.hidden) {
      this.sideNavConfig.labels.hidden = true;
      taFechando = true;
    }

    this.sidenav.close().then(() => {
      if (taFechando) {
        setTimeout(() => {
          this.opened = true; // this.sidenav.open();
        }, 1000);

        return;
      }
      this.sideNavConfig.labels.hidden = false;
      this.sidenav.open();
    });
  }

}
