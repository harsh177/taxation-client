import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TaxDetailsService } from './tax-details.service';

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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
