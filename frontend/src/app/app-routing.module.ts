import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DetailsComponent } from './component/details/details.component';
import { TvComponent } from './component/tv/tv.component';
import { TvdetailsComponent } from './component/tvdetails/tvdetails.component';
import { TrendingComponent } from './component/trending/trending.component';
import { PersondetailComponent } from './component/persondetail/persondetail.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SearchComponent } from './component/search/search.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { FilterComponent } from './component/filter/filter.component';
import { LanguageComponent } from './component/language/language.component';
import { ListComponent } from './component/list/list.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';

const routes: Routes = [
  { path: '', redirectTo: '/movie', pathMatch: 'full' },
  {path: 'movie', component: DashboardComponent , canActivate: [AuthGuard]},
  {path: 'tv' , component: TvComponent},
  {path: 'trending', component: TrendingComponent},
  {path: 'detail/:id', component: DetailsComponent},
  {path: 'tvdetail/:id', component: TvdetailsComponent},
  {path: 'persondetail/:id', component:PersondetailComponent},
  {path: 'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: 'search', component: SearchComponent},
  {path:'profile',component: ProfileComponent},
  {path:'filter',component:FilterComponent},
  {path:'language',component:LanguageComponent},
  {path : 'list',component:ListComponent},
  {path : 'edit/:id', component:EditprofileComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
