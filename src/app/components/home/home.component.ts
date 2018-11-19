import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('slideshow') slideshow: any;
  imageUrlArray: Array<string>;
  constructor() { }

  ngOnInit() {
    this.imageUrlArray = ['../../../assets/images/app-schema.png'];
    // '7,9,10,15,25,32,45,48,49,57,62,66,72,73,78,79,88,90,96'.split(',')
    //   .map(str => '../../../assets/images/users/' + str + '.jpg');
  }

}
