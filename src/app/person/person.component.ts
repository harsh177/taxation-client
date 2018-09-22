import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import { PersonService } from './person.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination/dist/ngx-pagination.module';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons:any = [];
  constructor(private route:ActivatedRoute,private router:Router,private  personService:PersonService) { }

  ngOnInit() {
    this.getPersons();
    
  }

  getPersons(){
  this.personService.getPersons().subscribe(data=>{
      console.log(data);
      this.persons = data.data;
    },error=>{
      console.log(error);
    });
  }

  navigateToAddMember(){
    this.router.navigate(['/member/add',true]);
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
