import { Component, OnInit } from '@angular/core';
import { IPerson } from '../person/person-interface';
import { PersonService } from '../person/person.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {
   person={
    name:"",
    gender:"",
    husband:"",
    father:"",
    samagraId:"",
    phone:"",
    caste:""
  };

  constructor(private personService:PersonService,private toastr: ToastrService,private router:Router) { }

  ngOnInit() {
  }

  savePerson(){
    console.log(this.person);
    this.personService.savePerson(this.person).subscribe(data=>{
      console.log(data);
      this.toastr.success('Member added successfully','Success');
      this.resetData();
      this.router.navigate(['/home']);
    },error=>{
      this.toastr.error('Make sure all details are correct, try agan','Error');
      console.log(error);
    });
   
  }

  resetData(){
    this.person={
      name:"",
      gender:"",
      husband:"",
      father:"",
      samagraId:"",
      phone:"",
      caste:""
    };
  }

}
