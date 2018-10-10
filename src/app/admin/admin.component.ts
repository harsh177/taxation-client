import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { AdminService } from './admin.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private  adminService:AdminService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  calculateTax(){
    this.spinner.show();
    this.adminService.calculateTax().subscribe(data=>{
      this.spinner.hide();
        console.log(data);
        this.toastr.success("All Properties tax calculated","Success");
      },error=>{
        this.spinner.hide();
        console.log(error);
    });
  }

}
