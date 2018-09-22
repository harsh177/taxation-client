import { Component, OnInit } from '@angular/core';
import { Logo } from '../logo';
import  * as  jsPDF from  'jspdf';
import  * as  html2canvas from  'html2canvas';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import { TaxDetailsService } from '../tax-details/tax-details.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  logo_panchayat  = Logo.panchayat;
  logo_spec  = Logo.spec;

  taxDetailsId = "";
  taxDetail:any = {};
  month = "";
  year:number;
  currentUser:any;
  
  constructor(private route:ActivatedRoute,private router:Router,private taxDetailService:TaxDetailsService) { }

  ngOnInit() {

    this.currentUser = <any>JSON.parse(localStorage.getItem('currentUser'));

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.taxDetailsId = param.get('id');  
      console.log(this.taxDetailsId);
      this.getTaxDetail(this.taxDetailsId);
    })
  }

  d:Date;

  getTaxDetail(taxDetailsId){
    this.taxDetailService.getTaxDetailsByTaxDetailId(taxDetailsId).subscribe(data=>{
      this.taxDetail = data.data;
      console.log(this.taxDetail);
      this.d = new Date(Date.parse(this.taxDetail.lastTaxPaidOn));
      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      this.month = month[this.d.getMonth()];
      this.year = this.d.getFullYear();

      console.log();

    },error=>{
      console.log(error);
    });
  }

  download(){
    html2canvas(document.getElementById('printall')).then(function(canvas) {
      console.log(canvas);
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',15,10);
    //doc.addImage(imgData, 'JPEG', left margin , top margin, width, length)
    doc.save('TaxReciept.pdf');
    });
  }
}
