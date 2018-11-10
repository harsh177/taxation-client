import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property/proprty.service';
import { IPropertyUsage } from '../property/property-usage-interface';
import { IPropertyType } from '../property/property-type-interface';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { Common } from '../common';

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

  areas=Common.areas;

  cities=["Ratlam"];

  property:any={
    regDate:"",
    propertyId:"",
    propertyNumber:"",
    subHolder:"",
    area:"",
    propertyUsage:"",
    propertyType:"",
    village:"",
    district:"",
    tehsil:"",
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

  action;
  propertyObj:any;
  areaError=false;
  propertyUsageError=false;
  propertyTypeError=false;

  cDate;
  constructor(private spinner: NgxSpinnerService,private route:ActivatedRoute,private _formBuilder:FormBuilder,private propertyService:PropertyService,private toastr: ToastrService,private router:Router) { }


  ngOnInit() {
    var currentDate = new Date();
    this.cDate = currentDate.getFullYear()+"-"+("0" + (currentDate.getMonth() + 1)).slice(-2)+"-"+("0" + currentDate.getDate()).slice(-2);
console.log(this.cDate);

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.action = param.get('action'); 
      if(this.action=='false') {
        this.propertyObj  = this.propertyService.getPropertyObj();
        if(this.propertyObj==undefined){
          this.router.navigate(['/property']);    
        }
        
      }
      this.fetchPreDetails();

      console.log(this.action);
    });

    this.uuid = this.generateUUID();

    this.propertyForm = this._formBuilder.group({
      regDate:[this.cDate],
      propertyId:[""],
      samagraId:[""],
      customUniqueId:[""],
      propertyTypes:[[]],
      propertyUsages:[[]],
      documents:[[]],
      active:[true],
      transferredToSamagraId:[null],
      transferred:[false],
      propertyNumber:["",[Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
      subHolder:[""],
      area:["--Select--"],
      propertyUsage:["--Select--"],
      propertyType:["--Select--"],
      village:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      district:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      tehsil:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
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

    if(this.propertyObj.isResidential==true)
    this.propertyObj.residential="YES";
    else  {
      this.propertyObj.residential="NO";
      this.onResidentialNo(null);
    }
    delete this.propertyObj.isResidential;
    if(this.propertyObj.isWaterConnected==true)
    this.propertyObj.waterConnected="YES";
    else  this.propertyObj.waterConnected="NO";
    delete this.propertyObj.isWaterConnected;

    this.propertyObj.regDate = this.cDate;
    this.propertyObj.propertyType = "--Select--";
    this.propertyObj.propertyUsage = "--Select--";
    this.propertyForm.setValue(this.propertyObj);
  }

  fetchPreDetails(){
    this.spinner.show();
    this.propertyService.getAllPropertyUsage().subscribe(data=>{
      this.spinner.hide();
      console.log(data);
      this.propertyUsages = <any[]>data.data;
      this.propertyUsages.forEach(obj=> {
        
        if(this.action=='false' &&  this.propertyObj!=undefined){
        this.propertyObj.propertyUsages.forEach(obj1=> {
          if(obj.propertyUsageId==obj1.propertyUsageId){
            obj.checked = true;
            this.propertyForm.controls['propertyUsage'].setValue(obj.propertyUsageId);
          }
         })
         
        }else obj.checked = false;
     })

     if(this.action=='false')delete this.propertyObj.propertyUsages;
    },error=>{
      this.spinner.hide();
      console.log(error);
    });
    this.propertyService.getAllPropertyType().subscribe(data=>{
      this.spinner.hide();
      this.propertyTypes = <any[]>data.data;
      this.propertyTypes.forEach(obj=> {
        if(this.action=='false' &&  this.propertyObj!=undefined){
        this.propertyObj.propertyTypes.forEach(obj1=> {
          if(obj.propertyTypeId==obj1.propertyTypeId){
            obj.checked = true;
            this.propertyForm.controls['propertyType'].setValue(obj.propertyTypeId);
          }
         })
         
        }else obj.checked = false;
      })

      if(this.action=='false')delete this.propertyObj.propertyTypes;

    },error=>{
      this.spinner.hide();
      console.log(error);
    });

  }

  documentDelete(documentId){
    this.propertyObj.documents  = this.propertyObj.documents.filter(obj=>{
      return  obj.documentId!=documentId;
    })
  }

  saveProperty(samagraId){
    this.property = this.propertyForm.value;
    if(this.property.area=="--Select--"){
      this.areaError=true;
      return;
    }else this.areaError=false;

    if(this.property.propertyUsage=="--Select--"){
      this.propertyUsageError=true;
      return;
    }else this.propertyUsageError=false;

    if(this.property.propertyType=="--Select--"){
      this.propertyTypeError=true;
      return;
    }else this.propertyTypeError=false;

    this.property.samagraId = samagraId;
    this.property.propertyUsages = this.propertyUsages.filter(obj => obj.propertyUsageId==this.property.propertyUsage).map(obj => { return {propertyUsageId:obj.propertyUsageId,name: obj.name}});
    this.property.propertyTypes = this.propertyTypes.filter(obj => obj.propertyTypeId==this.property.propertyType).map(obj => { return {propertyTypeId:obj.propertyTypeId,name: obj.name}});

    if(this.property.residential=='YES')this.property.isResidential=true;
    else this.property.isResidential=false;

    if(this.property.waterConnected=='YES')this.property.isWaterConnected=true;
    else this.property.isWaterConnected=false;

    delete this.property.residential;
    delete this.property.waterConnected;

    this.property.documents = this.documents;

    if(this.action=='false'){
      this.propertyObj.documents.forEach(obj=>{
        this.property.documents.push(obj);
      })
      this.property.samagraId = this.propertyObj.samagraId;
      this.property.customUniqueId = this.propertyObj.customUniqueId;
    }

    console.log(this.property);

    //if(!this.isCheckboxesSelected())return;

    this.spinner.show();
    if(this.action=='true'){
    this.propertyService.saveProperty(this.property).subscribe(data=>{
      console.log(data);
      this.spinner.hide();
      this.toastr.success('Property added successfully','Success');
      this.resetData();
      this.router.navigate(['/property']);
    },error=>{
      this.spinner.hide();
      this.toastr.error('Make sure all details are correct, try again','Error');
      console.log(error);
    });
  }
  
    if(this.action=='false'){
    this.propertyService.updateProperty(this.property).subscribe(data=>{
      console.log(data);
      this.spinner.hide();
      this.toastr.success('Property updated successfully','Success');
      this.resetData();
      this.router.navigate(['/property']);
    },error=>{
      this.spinner.hide();
      this.toastr.error('Make sure all details are correct, try again','Error');
      console.log(error);
    });
  }

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
    this.spinner.show();
    this.propertyService.getPropertyByPhoneOrSamagra(this.phoneOrSamagra).subscribe(data=>{
      this.spinner.hide();
      this.personAndPropertyList = <any>data.data;
      console.log(this.personAndPropertyList);
      this.searchPersonError=false;
    },error=>{
      this.spinner.hide();
      this.searchPersonError=true;
      console.log(error);
    });
  }

  searchPersonError=false;

  resetData(){
    
    this.property={
      regDate:"",
      propertyId:"",
      propertyNumber:"",
      subHolder:"",
      area:"",
      propertyUsage:"",
      propertyType:"",
      village:"",
      district:"",
      tehsil:"",  
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
    this.fileToUpload=[];
    for(var i=0;i<files.length;i++){
      this.fileToUpload.push(files.item(i));  
    }
    console.log(event);
  }

  uploadFile() {
    if(this.fileToUpload == null){
      return;
    }
    this.spinner.show();
    this.propertyService.postFile(this.fileToUpload,this.uuid).subscribe(data => {
      // do something, if upload success
      console.log(data);
      this.spinner.hide();
      data.forEach(element => {
        this.documents.push({name:element.fileName,downloadUri:element.fileDownloadUri,size:element.size});
      });
      this.toastr.success('File(s) sucessfully uploaded','Success');
      }, error => {
        this.spinner.hide();
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
