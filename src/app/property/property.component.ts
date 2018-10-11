import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import { PaginationInstance } from '../../../node_modules/ngx-pagination';
import { PropertyService } from './proprty.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { PersonService } from '../person/person.service';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import  * as  jsPDF from  'jspdf';
import  * as  html2canvas from  'html2canvas';
import { Common } from '../common';
declare var   $:any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  validateSamagraErrorMessage="Invalid Samagra Id";
  action = "";
  searchBy  = "SAMAGRA";
  properties:any = [];
  error = false;
  currentUser:any;
  constructor(private spinner: NgxSpinnerService,private personService:PersonService,private toastr: ToastrService,private route:ActivatedRoute,private router:Router,private propertyService:PropertyService) {}

  ngOnInit() {
    this.uuid = this.generateUUID();

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.action = param.get('action');  
      console.log(this.action);
    })

    this.currentUser = <any>JSON.parse(localStorage.getItem('currentUser'));
  }

  transferObj={
    propertyId:"",
    transferToSamagraId:"",
    newSubHolder:"",
    residentName:"",
    documents:[]
  };

  transferFormVisiblity=false;
  currentSelectedSamagraId="";
  ctId = "";
  op(v,id,sam){
    this.currentSelectedSamagraId=sam;
    this.ctId = "";
    $('#'+v).modal('show');
    if(v.toString().indexOf("transfer")!=-1){
      this.ctId = v;
      this.transferObj.propertyId=id.toString();
    }
    
  }

  downloadPatta(id){
    html2canvas(document.getElementById(id)).then(function(canvas) {
      console.log(canvas);
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',5,10);
    //doc.addImage(imgData, 'JPEG', left margin , top margin, width, length)
    var d = new Date();
    doc.save('Property_Patta_'+d+'.pdf');
    });
  }

  exp(e){
    return  e.reduce(function(all,item,index){all.push(item.name);return all;},[]);
  }

  cancel(){
    this.resetData();
  }

  edit(propertyObj){
    $(".tooltip").tooltip("hide");
    this.propertyService.setPropertyObj(propertyObj);
    this.router.navigate(['/property/add',false]);
  }
  deleteKey = Common.deleteKey;

  delete(propertyId){
    var val = prompt("Please enter your key to delete", "");
    if(val.trim().length==0)return;
    if(val!=this.deleteKey){
      this.toastr.error('Invalid Key, Try again','Error');
      return;
    }

    $(".tooltip").tooltip("hide");
    this.spinner.show();
    this.propertyService.deleteProperty(propertyId).subscribe(data=>{
      this.spinner.hide();
      console.log(data);
      this.getDetailsByPhoneOrSamagraOrUniqueId();
      this.toastr.success('Property deleted successfully','Success');
    },error=>{
      this.spinner.hide();
      console.log(error);
    }); 
  }

  navigateToTaxDetails(propertyId){
    $(".tooltip").tooltip("hide");
    this.router.navigate(['/taxdetails',propertyId]);
  }

  transferProperty(){
    $(".tooltip").tooltip("hide");
    if(this.transferObj.propertyId=="" ||  this.transferObj.transferToSamagraId=="" || this.transferObj.newSubHolder=="" ||  this.transferObj.residentName=="" )return;
    this.spinner.show();
    this.propertyService.transferProperty(this.transferObj).subscribe(data=>{
      $('#'+this.ctId).modal('hide');
      this.spinner.hide();
      this.toastr.success('Property transfered successfully','Success');
      this.resetData();
      this.getDetailsByPhoneOrSamagraOrUniqueId();
    },error=>{
      this.spinner.hide();
      this.toastr.error('Make sure all details are correct, try again','Error');
      console.log(error);
    });
  }

  resetData(){
    this.transferObj={
      propertyId:"",
      transferToSamagraId:"",
      newSubHolder:"",
      residentName:"",
      documents:[]
    };
    this.transferFormVisiblity=false;
    this.validateSamagraError=false;
  }

  fileToUpload: File[] = [];
  documents:any[] = [];
  uuid:string;
  validateSamagraError=false;
  
  validateSamagra(){
    this.spinner.show();
    this.personService.getPersonBySamagraId(this.transferObj.transferToSamagraId).subscribe(d=>{
      this.spinner.hide();
      let data=<any>d;
      console.log(data);
      if(!data.status){
        this.validateSamagraErrorMessage="Invalid Samagra Id";
        this.validateSamagraError=true;
        this.transferFormVisiblity=false;
      }else{
        if(this.currentSelectedSamagraId==data.data.samagraId){
          this.validateSamagraErrorMessage="Property can not be transfered to itself";
          this.validateSamagraError=true;
          this.transferFormVisiblity=false;
          return;
        }
        this.validateSamagraErrorMessage="";
        this.validateSamagraError=false;
        this.transferFormVisiblity=true;
      }
    },error=>{
      this.spinner.hide();
      console.log(error);
    });
  }

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
    this.spinner.show();
    this.propertyService.postFile(this.fileToUpload,this.uuid).subscribe(data => {
      // do something, if upload success
      
      console.log(data);
      data.forEach(element => {
        this.transferObj.documents.push({name:element.fileName,downloadUri:element.fileDownloadUri,size:element.size});
      });
      this.spinner.hide();
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

  phoneOrSamagraOrUnique={
    phoneNumber:"",
    samagraId:"",
    customUniqueId:""
  };

  searchValue="";
  personDetails:any={};

  getDetailsByPhoneOrSamagraOrUniqueId(){
    if(this.searchValue.trim().length==0)return;
    if(this.searchBy == "SAMAGRA"){
      this.phoneOrSamagraOrUnique={
        phoneNumber:"",
        samagraId:this.searchValue,
        customUniqueId:""
      };
    }else if(this.searchBy == "PHONE"){
      this.phoneOrSamagraOrUnique={
        phoneNumber:this.searchValue,
        samagraId:"",
        customUniqueId:""
      };
    }else{
      this.phoneOrSamagraOrUnique={
        phoneNumber:"",
        samagraId:"",
        customUniqueId:this.searchValue
      };
    }
    this.spinner.show();
    this.propertyService.getPropertyByPhoneOrSamagraOrUniqueId(this.phoneOrSamagraOrUnique).subscribe(data=>{
      this.spinner.hide();
      let propertyDetailsObj = <any>data.data;
      this.personDetails  = <any>propertyDetailsObj.person;
      this.properties = <any>propertyDetailsObj.propertyList;
      if(this.properties.length==0)this.error=true;
      else  this.error=false;
      console.log(this.properties);
     
      setTimeout(function(){ 
        $('[data-toggle="tooltip"]').tooltip();
       }, 200);

    },error=>{
      this.properties = [];
      this.personDetails  = {};
      this.spinner.hide();
      this.error=true;
      console.log(error);
    });
  }
  
  navigateToAddProperty(){
      this.router.navigate(['/property/add',true]);
  }  

  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  onPageChange(number: number) {
      console.log('change to page', number);
      this.config.currentPage = number;
  }

}
