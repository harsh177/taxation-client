import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/proprty.service';
import { IProperty } from '../property/property-interface';
import { IPerson } from '../person/person-interface';
import { Router } from '../../../node_modules/@angular/router';

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

  constructor(private propertyService:PropertyService,private router:Router) { }

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
    this.propertyService.getPropertyByPhoneOrSamagra(this.phoneOrSamagra).subscribe(data=>{
      this.searchPersonError=false;
      this.personAndPropertyList = <any>data.data;
      console.log(this.personAndPropertyList);
    },error=>{
      this.searchPersonError=true;
      console.log(error);
    });
  }

  openTaxDetails(propertyId){
    this.router.navigate(['/taxdetails',propertyId]);
  }

}
