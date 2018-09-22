import { Component, OnInit } from '@angular/core';
import { Logo } from '../logo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = "";

  logo_panchayat  = Logo.panchayat;

  currentUser:any;

  constructor() { }

  ngOnInit() {
    this.currentUser = <any>JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

}
