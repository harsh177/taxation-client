import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { PropertyComponent } from './property/property.component';
import { PropertyAddComponent } from './property-add/property-add.component';
import { FooterComponent } from './footer/footer.component';
import { PayTaxComponent } from './pay-tax/pay-tax.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './guard/auth-guard';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { PrintComponent } from './print/print.component';
import { NgxPaginationModule } from '../../node_modules/ngx-pagination/dist/ngx-pagination';
import { StringFilterPipe } from './helper/string.filter';
import { MemberFilterPipe } from './helper/member.filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PropertyFilterPipe } from './helper/property.filter';
import { TaxFilterPipe } from './helper/taxDetail.filter';
import { ReportComponent } from './report/report.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,
    PersonComponent,
    PersonAddComponent,
    PropertyComponent,
    PropertyAddComponent,
    FooterComponent,
    PayTaxComponent,
    TaxDetailsComponent,
    PrintComponent,
    StringFilterPipe,
    MemberFilterPipe,
    PropertyFilterPipe,
    TaxFilterPipe,
    ReportComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [ToastrService,AuthGuardService,{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
