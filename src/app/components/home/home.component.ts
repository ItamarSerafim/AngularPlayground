import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  @ViewChild('slideshow') slideshow: any;
  imageUrlArray: Array<string>;
  slideShowMinHeight = '535px';
  animateMe = false;
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    this.breakpointObserver.observe([
      '(min-height:  715px)',
      // '(max-width:  599px)',
      // '(min-width: 1024px)',
      // '(min-width: 600px) and (max-width: 1023px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.slideShowMinHeight = '535px';
        if ( result.breakpoints['(max-width:  599px)']) {
        } else if (result.breakpoints['(min-width: 600px) and (max-width: 1023px)']) {
        } else if (result.breakpoints['(min-width: 1024px)']) {
        }
      }
    });
    this.imageUrlArray = [
      '../../../assets/images/app-schema.png',
      '../../../assets/images/admin-page.png',
      '../../../assets/images/data-management-page.png',
      '../../../assets/images/home-slide-show/edit-link-ipad.png',
      '../../../assets/images/home-slide-show/site-navigation_iPhone_5_SE.png',
      '../../../assets/images/home-slide-show/register_iPhone_6_7_8.png',
      '../../../assets/images/home-slide-show/login_iPhone_6_7_8.png'
    ];
    // '7,9,10,15,25,32,45,48,49,57,62,66,72,73,78,79,88,90,96'.split(',')
    //   .map(str => '../../../assets/images/users/' + str + '.jpg');
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.animateMe = true;
    }, 300);
  }

}
