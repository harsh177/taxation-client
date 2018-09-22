import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/proprty.service';
import { IPropertyUsage } from '../property/property-usage-interface';
import { IPropertyType } from '../property/property-type-interface';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {

  residential = "YES";
  waterConnected = "YES";
  searchBy="SAMAGRA";
  searchValue = "";

  property:any={
    propertyId:"",
    propertyNumber:"",
    subHolder:"",
    area:"",
    city:"",
    pincode:"",
    samagraId:"",
    isResidential:true,
    residential:"",
    residentName:"",
    length:"",
    width:"",
    eastLandmark:"",
    westLandmark:"",
    northLandmark:"",
    southLandmark:"",
    sharedWallDescription:"",
    isWaterConnected:true,
    waterConnected:"",
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
    person:<any>{},
    propertyList:[]
  };

  error= {
    propertyUsageSelected:false,
    propertyTypeSelected:false
  };

  propertyForm:FormGroup;
  
  uuid:string;

  constructor(private _formBuilder:FormBuilder,private propertyService:PropertyService,private toastr: ToastrService,private router:Router) { }

  ngOnInit() {

    this.uuid = this.generateUUID();

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

    this.propertyForm = this._formBuilder.group({
      propertyNumber:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      subHolder:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      area:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      city:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      pincode:["",[Validators.required,Validators.pattern('^[1-9][0-9]{5}$')]],
      residential:["YES"],
      residentName:[{value:"",disabled:false},[Validators.maxLength(50)]],
      length:["",[Validators.required,Validators.minLength(1),Validators.maxLength(10)]],
      width:["",[Validators.required,Validators.minLength(1),Validators.maxLength(10)]],
      eastLandmark:["",[Validators.maxLength(50)]],
      westLandmark:["",[Validators.maxLength(50)]],
      northLandmark:["",[Validators.maxLength(50)]],
      southLandmark:["",[Validators.maxLength(50)]],
      sharedWallDescription:["",[Validators.maxLength(200)]],
      waterConnected:["YES"],
      waterBillDescription:["",[Validators.maxLength(200)]],
      otherDescription:["",[Validators.maxLength(200)]]
    });
  }

  saveProperty(samagraId){
    this.property = this.propertyForm.value;

    this.property.samagraId = samagraId;
    this.property.propertyUsages = this.propertyUsages.filter(obj => obj.checked).map(obj => { return {propertyUsageId:obj.propertyUsageId,name: obj.name}});
    this.property.propertyTypes = this.propertyTypes.filter(obj => obj.checked).map(obj => { return {propertyTypeId:obj.propertyTypeId,name: obj.name}});

    if(this.residential=='YES')this.property.isResidential=true;
    else this.property.isResidential=false;
    if(this.waterConnected=='YES')this.property.isWaterConnected=true;
    else this.property.isWaterConnected=false;

    delete this.property.residential;
    delete this.property.waterConnected;

    this.property.documents = this.documents;
    this.property.customUniqueId = this.uuid;

    console.log(this.property);

    if(!this.isCheckboxesSelected())return;

    this.propertyService.saveProperty(this.property).subscribe(data=>{
      console.log(data);
      this.toastr.success('Property added successfully','Success');
      this.resetData();
      this.router.navigate(['/property']);
    },error=>{
      this.toastr.error('Make sure all details are correct, try again','Error');
      console.log(error);
    });
  
  }

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
      subHolder:"",
      area:"",
      city:"",
      pincode:"",
      samagraId:"",
      isResidential:true,
      residential:"",
      residentName:"",
      length:"",
      width:"",
      eastLandmark:"",
      westLandmark:"",
      northLandmark:"",
      southLandmark:"",
      sharedWallDescription:"",
      isWaterConnected:true,
      waterConnected:"",
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

  onUsageChange(usageID:string, isChecked: boolean) {
    console.log(isChecked+" "+usageID);
    this.propertyUsages.forEach(obj=>{
      if(obj.propertyUsageId==usageID)obj.checked = isChecked;
    });
  }

  onResidentialYes(event){
    console.log(event);
    this.propertyForm.controls['residentName'].enable();
  }
  
  onResidentialNo(event){
    console.log(event);
    this.propertyForm.controls['residentName'].disable();
  }

  onTypeChange(typeID:string, isChecked: boolean) {
    this.propertyTypes.forEach(obj=>{
      if(obj.propertyTypeId==typeID)obj.checked = isChecked;
    });
  }

  isCheckboxesSelected(){
    let usage = false;
    for(let i=0;i<this.propertyUsages.length;i++){
      if(this.propertyUsages[i].checked){
        usage = true;
        break;
      }
    }
    if(usage)this.error.propertyUsageSelected = false;
    else this.error.propertyUsageSelected = true;

    let type = false;
    for(let i=0;i<this.propertyTypes.length;i++){
      if(this.propertyTypes[i].checked){
        type = true;
        break;
      }
    }
    if(type)this.error.propertyTypeSelected = false;
    else this.error.propertyTypeSelected = true;

    return usage && type;
  }

  fileToUpload: File[] = [];
  documents:any[] = [];

  fileEvent(files: FileList){
    this.documents=[];
    for(var i=0;i<files.length;i++){
      this.fileToUpload.push(files.item(i));  
    }
    console.log(event);
  }

  uploadFile() {
    if(this.fileToUpload == null){
      return;
    }
    this.propertyService.postFile(this.fileToUpload,this.uuid).subscribe(data => {
      // do something, if upload success
      console.log(data);
      data.forEach(element => {
        this.documents.push({name:element.fileName,downloadUri:element.fileDownloadUri,size:element.size});
      });
      this.toastr.success('File(s) sucessfully uploaded','Success');
      }, error => {
        console.log(error);
      });
  }

  generateUUID() {
    var d = new Date().getTime();
    if(Date.now){
        d = Date.now(); //high-precision timer
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid.split("-")[0].toUpperCase();
  };

}
