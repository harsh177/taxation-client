import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { ReportService } from '../report.service';
import { Common } from '../common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  allstatus=["DUE","PAID","PROPERTIES"];
  
  areas=Common.areas;

  reportForm: FormGroup;

  constructor(private fb: FormBuilder,private reportService:ReportService) { }

  ngOnInit() {
    this.reportForm = this.fb.group({
      statusControl: ['DUE'],
      area: ['--Select--']
    });
  }

  downloadReport(){
    console.log(this.reportForm.value);
    // this.reportService.getTaxByTaxStatus(this.reportForm.value.statusControl).subscribe(data=>{
    //   window.open(window.URL.createObjectURL(data))
    // },error=>{
    //   console.log(error);
    // });
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'http://localhost:8080/api/downloadFile/report/'+this.reportForm.value.statusControl+'?area='+this.reportForm.value.area;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
