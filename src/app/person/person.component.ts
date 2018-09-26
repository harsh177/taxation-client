import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '../../../node_modules/@angular/router';
import { PersonService } from './person.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination/dist/ngx-pagination.module';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons:any = [];
  constructor(private route:ActivatedRoute,private toastr: ToastrService,private router:Router,private  personService:PersonService) { }

  ngOnInit() {
    this.getPersons();    
  }

  edit(id){
    this.personService.setId(id);
    this.router.navigate(['/member/add',false]);
  }

  delete(id){
    this.personService.deletePerson(id).subscribe(data=>{
      console.log(data);
      this.toastr.success('Member deleted successfully','Success');
      this.getPersons();
    },error=>{
      console.log(error);
    });  
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
