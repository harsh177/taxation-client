import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/proprty.service';
import { IPropertyUsage } from '../property/property-usage-interface';
import { IPropertyType } from '../property/property-type-interface';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {
  residential = "yes";
  waterConnected = "yes";

  property={
    propertyId:"",
    propertyNumber:"",
    area:"",
    city:"",
    pincode:"",
    samagraId:"",
    isResidential:true,
    residentName:"",
    length:"",
    width:"",
    eastLandmark:"",
    westLandmark:"",
    northLandmark:"",
    southLandmark:"",
    sharedWallDescription:"",
    isWaterConnected:true,
    waterBillDescription:"",
    otherDescription:"",
    personId:"",
    propertyUsages:[],   
    propertyTypes:[],
};

  propertyUsages=[];
  propertyTypes=[];

  phoneOrSamagra={
    phoneNumber:"",
    samagraId:""
  }
  personAndPropertyList={
    person:{},
    propertyList:[]
  };
  error=false;

  constructor(private propertyService:PropertyService,private toastr: ToastrService,private router:Router) { }

  ngOnInit() {
    this.propertyService.getAllPropertyUsage().subscribe(data=>{
      console.log(data);
      this.propertyUsages = <any[]>data.data;
      this.propertyUsages.forEach(obj=> {
        obj.checked = false;
     })
    },error=>{
      console.log(error);
    });
    this.propertyService.getAllPropertyType().subscribe(data=>{
      this.propertyTypes = <any[]>data.data;
      this.propertyTypes.forEach(obj=> {
        obj.checked = false;
     })

    },error=>{
      console.log(error);
    });
  }

  saveProperty(samagraId){
    this.property.samagraId = samagraId;
    this.property.propertyUsages = this.propertyUsages.filter(obj => obj.checked).map(obj => { return {propertyUsageId:obj.propertyUsageId,name: obj.name}});
    this.property.propertyTypes = this.propertyTypes.filter(obj => obj.checked).map(obj => { return {propertyTypeId:obj.propertyTypeId,name: obj.name}});

    if(this.residential=='yes')this.property.isResidential=true;
    else this.property.isResidential=false;
    if(this.waterConnected=='yes')this.property.isWaterConnected=true;
    else this.property.isWaterConnected=false;

    console.log(this.property);

    this.propertyService.saveProperty(this.property).subscribe(data=>{
      console.log(data);
      this.toastr.success('Property added successfully','Success');
      this.resetData();
      this.router.navigate(['/home']);
    },error=>{
      this.toastr.error('Make sure all details are correct, try agan','Error');
      console.log(error);
    });
  
  }

  getDetailsByPhoneOrSamagra(){
    this.propertyService.getPropertyByPhoneOrSamagra(this.phoneOrSamagra).subscribe(data=>{
      this.personAndPropertyList = <any>data.data;
      console.log(this.personAndPropertyList);
    },error=>{
      console.log(error);
    });
  }

  resetData(){
    
    this.property={
      propertyId:"",
      propertyNumber:"",
      area:"",
      city:"",
      pincode:"",
      samagraId:"",
      isResidential:true,
      residentName:"",
      length:"",
      width:"",
      eastLandmark:"",
      westLandmark:"",
      northLandmark:"",
      southLandmark:"",
      sharedWallDescription:"",
      isWaterConnected:true,
      waterBillDescription:"",
      otherDescription:"",
      personId:"",
      propertyUsages:[],   
      propertyTypes:[],
  };
  this.propertyUsages.forEach(obj=> {
        obj.checked = false;
     })
     this.propertyTypes.forEach(obj=> {
      obj.checked = false;
   })
  }
}
