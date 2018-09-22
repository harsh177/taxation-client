import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import { PaginationInstance } from '../../../node_modules/ngx-pagination';
import { PropertyService } from './proprty.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  action = "";
  searchBy  = "SAMAGRA";
  properties:any = [];

  constructor(private route:ActivatedRoute,private router:Router,private propertyService:PropertyService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.action = param.get('action');  
      console.log(this.action);
    })
  }

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
    this.propertyService.getPropertyByPhoneOrSamagraOrUniqueId(this.phoneOrSamagraOrUnique).subscribe(data=>{
      this.properties = <any>data.data;
      console.log(this.properties);
    },error=>{
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
