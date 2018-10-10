import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/proprty.service';
import { IProperty } from '../property/property-interface';
import { IPerson } from '../person/person-interface';
import { Router } from '../../../node_modules/@angular/router';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';

@Component({
  selector: 'app-pay-tax',
  templateUrl: './pay-tax.component.html',
  styleUrls: ['./pay-tax.component.css']
})
export class PayTaxComponent implements OnInit {
  
  phoneOrSamagra={
    phoneNumber:"",
    samagraId:""
  }
  personAndPropertyList={
    person:<any>{},
    propertyList:[]
  };

  error=false;

  constructor(private spinner: NgxSpinnerService,private propertyService:PropertyService,private router:Router) { }

  ngOnInit() {
  }

  searchBy="SAMAGRA";
  searchValue = "";
  searchPersonError=false;

  getDetailsByPhoneOrSamagra(){
    if(this.searchValue.trim().length==0)return;
    if(this.searchBy == "SAMAGRA"){
      this.phoneOrSamagra={
        phoneNumber:"",
        samagraId:this.searchValue
      };
    }else{
      this.phoneOrSamagra={
        phoneNumber:this.searchValue,
        samagraId:""
      };
    }
    this.spinner.show();
    this.propertyService.getPropertyByPhoneOrSamagra(this.phoneOrSamagra).subscribe(data=>{
      this.spinner.hide();
      this.searchPersonError=false;
      this.personAndPropertyList = <any>data.data;
      console.log(this.personAndPropertyList);
    },error=>{
      this.spinner.hide();
      this.searchPersonError=true;
      console.log(error);
    });
  }

  openTaxDetails(propertyId){
    this.router.navigate(['/taxdetails',propertyId]);
  }

}
