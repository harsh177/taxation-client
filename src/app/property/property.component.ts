import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import { PaginationInstance } from '../../../node_modules/ngx-pagination';
import { PropertyService } from './proprty.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { PersonService } from '../person/person.service';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
declare var   $:any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  action = "";
  searchBy  = "SAMAGRA";
  properties:any = [];
  error = false;
  constructor(private spinner: NgxSpinnerService,private personService:PersonService,private toastr: ToastrService,private route:ActivatedRoute,private router:Router,private propertyService:PropertyService) {}

  ngOnInit() {
    this.uuid = this.generateUUID();

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.action = param.get('action');  
      console.log(this.action);
    })
  }

  transferObj={
    propertyId:"",
    transferToSamagraId:"",
    newSubHolder:"",
    residentName:"",
    documents:[]
  };

  transferFormVisiblity=false;
  ctId = "";
  op(v,id){
    this.ctId = "";
    $('#'+v).modal('show');
    if(v.toString().indexOf("transfer")!=-1){
      this.ctId = v;
      this.transferObj.propertyId=id.toString();
    }
  }

  cancel(){
    this.resetData();
  }

  edit(propertyObj){
    this.propertyService.setPropertyObj(propertyObj);
    this.router.navigate(['/property/add',false]);
  }

  delete(propertyId){
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
    this.router.navigate(['/taxdetails',propertyId]);
  }

  transferProperty(){
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
    this.personService.getPersonBySamagraId(this.transferObj.transferToSamagraId).subscribe(data=>{
      this.spinner.hide();
      console.log(data);
      if(!data.status){
        this.validateSamagraError=true;
        this.transferFormVisiblity=false;
      }else{
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
      this.properties = <any>data.data;
      if(this.properties.length==0)this.error=true;
      else  this.error=false;
      console.log(this.properties);
    },error=>{
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
