import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { PropertyComponent } from './property/property.component';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PayTaxComponent } from './pay-tax/pay-tax.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { AuthGuardService } from './guard/auth-guard';


const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'member',component:PersonComponent , canActivateChild:[AuthGuardService],
    children:[{path:'add',component:PersonAddComponent}]
  },
  { path: 'property',component:PropertyComponent, canActivateChild:[AuthGuardService],
    children:[{path:'add',component:PropertyAddComponent}]
  },
  { path: 'paytax', component: PayTaxComponent , canActivate:[AuthGuardService]},
  { path: 'taxdetails/:id', component: TaxDetailsComponent,canActivate:[AuthGuardService] },  
  { path: '**', redirectTo: '' }
];

 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
