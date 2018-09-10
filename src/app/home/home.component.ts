import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToAddMember(){
    this.router.navigate(['/member/add']);
  }

  navigateToAddProperty(){
    this.router.navigate(['/property/add']);
  }

  navigateToPayTax(){
    this.router.navigate(['/paytax']);
  }
}
