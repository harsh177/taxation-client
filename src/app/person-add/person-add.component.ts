import { Component, OnInit } from '@angular/core';
import { IPerson } from '../person/person-interface';
import { PersonService } from '../person/person.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '../../../node_modules/@angular/router';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
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

  personForm:FormGroup;

  action;

  constructor(private route:ActivatedRoute,private _formBuilder:FormBuilder,private personService:PersonService,private toastr: ToastrService,private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.action = param.get('action');  
      console.log(this.action);
    })

    this.personForm = this._formBuilder.group({
      name:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      gender:["MALE"],
      husband:["",[Validators.maxLength(50)]],
      father:["",[Validators.maxLength(50)]],
      samagraId:[null,[Validators.required,Validators.pattern("^\\d{8}$")]],
      phone:[null,[Validators.required,Validators.pattern("^\\d{10}$")]],
      caste:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
    });
  }

  onSubmit(){
    console.log(this.personForm.value);
    this.personService.savePerson(this.personForm.value).subscribe(data=>{
      console.log(data);
      this.toastr.success('Member added successfully','Success');
      this.resetData();
      this.router.navigate(['/member']);
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
