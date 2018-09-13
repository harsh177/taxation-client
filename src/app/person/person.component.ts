import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  action = "";
  
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.action = param.get('action');  
      console.log(this.action);
    })
  }

}
