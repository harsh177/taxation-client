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
        if(data.status)
        this.toastr.success(data.data,"Success");
        else  this.toastr.error(data.data,"Error");
      },error=>{
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error.data,"Error");
    });
  }

}
