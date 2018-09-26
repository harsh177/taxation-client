import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TaxDetailsService } from './tax-details.service';
import { PaginationInstance } from '../../../node_modules/ngx-pagination';

@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.css']
})
export class TaxDetailsComponent implements OnInit {
  
  taxDetails = [];
  propertyId = "";
  constructor(private route:ActivatedRoute,private router:Router,private modalService: NgbModal,private taxDetailService:TaxDetailsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.propertyId = param.get('id');  
      console.log(this.propertyId);
      this.getTaxDetails(this.propertyId);
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  getTaxDetails(propertyId){
    this.taxDetailService.getTaxDetailsByPropertyId(propertyId).subscribe(data=>{
      this.taxDetails = <any[]>data.data;
      console.log(this.taxDetails);
    },error=>{
      console.log(error);
    });
  }

  payTax(taxDetailId){
    let details = this.taxDetails.filter(obj=>obj.taxDetailId==taxDetailId);
    console.log(details);
    this.taxDetailService.updateTaxStatus(details).subscribe(data=>{
      this.getTaxDetails(this.propertyId);
    },error=>{
      console.log(error);
    });
  }

  viewReciept(taxDetailsId){
    this.router.navigate(['/print',taxDetailsId]);
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
