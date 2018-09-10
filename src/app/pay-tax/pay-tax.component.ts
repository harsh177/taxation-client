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
    person:{},
    propertyList:[]
  };

  error=false;

  constructor(private propertyService:PropertyService,private router:Router) { }

  ngOnInit() {
  }

  getDetailsByPhoneOrSamagra(){
    this.propertyService.getPropertyByPhoneOrSamagra(this.phoneOrSamagra).subscribe(data=>{
      this.personAndPropertyList = <any>data.data;
      console.log(this.personAndPropertyList);
    },error=>{
      console.log(error);
    });
  }

  openTaxDetails(propertyId){
    this.router.navigate(['/taxdetails',propertyId]);
  }

}
