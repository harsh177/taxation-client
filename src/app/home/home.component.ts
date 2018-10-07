import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import {PaginationInstance} from '../../../node_modules/ngx-pagination/dist/ngx-pagination.module';
declare var   $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
 
  constructor(private router:Router) { }

  currentUser:any;
  
  ngOnInit() {
    this.currentUser = <any>JSON.parse(localStorage.getItem('currentUser'));
  }

  op(){
    $('#adminCnfId').modal('show');
  }

  accept(){
    $('#adminCnfId').modal('hide');
    this.router.navigate(['/admin']);
  }

  navigateToMember(){
    this.router.navigate(['/member']);
  }

  navigateToProperties(){
    this.router.navigate(['/property']);
  }

  navigateToReports(){
    this.router.navigate(['/reports']);
  }
  
  navigateToPayTax(){
    this.router.navigate(['/paytax']);
  }

  navigateToAdmin(){
    this.router.navigate(['/admin']);
  }
}
