import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './component/details/details.component';
import { HeaderComponent } from './component/header/header.component';
import { TvComponent } from './component/tv/tv.component';
import { TvdetailsComponent } from './component/tvdetails/tvdetails.component';
import { TrendingComponent } from './component/trending/trending.component';
import { PersondetailComponent } from './component/persondetail/persondetail.component';
import { LoginComponent } from './component/login/login.component';
import { ChipModule } from 'primeng/chip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './component/search/search.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './component/profile/profile.component';
import { FilterComponent } from './component/filter/filter.component';
import { LanguageComponent } from './component/language/language.component';
import { ListComponent } from './component/list/list.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    HeaderComponent,
    TvComponent,
    TvdetailsComponent,
    TrendingComponent,
    PersondetailComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    ProfileComponent,
    FilterComponent,
    LanguageComponent,
    ListComponent,
    EditprofileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChipModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
