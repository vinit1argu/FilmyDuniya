import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { SharedService } from 'src/app/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('searchInputRef', { static: false }) searchInputRef !: ElementRef;


  constructor(private renderer: Renderer2, private el: ElementRef,private userservice:UserService , private router:Router, private sharedService: SharedService ,private toastr:ToastrService ,private authservice:AuthService){}

  isDropdownOpen = false;
  isGenreDropdownOpen=false;

  searchInput:string = '';

  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
    closeDropdown() {
      this.isDropdownOpen = false;
    }

    closeGenreDropdown() {
      this.isGenreDropdownOpen = false;
    }
  

  openProfile(){}

  logoutUser(){
       this.userservice.logout().subscribe(
        response=>{console.log(response);
          this.toastr.success('Successfully Logged Out', 'Success');
          this.authservice.isLoggedIn=false;
          this.router.navigate(['/login']); },
        error=>{
          this.toastr.error('Not Logged In', 'Error');
          console.log(error);
        }
       );
  }



  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // if (!this.el.nativeElement.querySelector('.dropdown').contains(event.target)) {
    //   this.closeDropdown();
    //   this.closeGenreDropdown();
    // }
   

    const isProfileDropdown = this.el.nativeElement.querySelector('.profile-dropdown').contains(event.target);
    const isGenreDropdown = this.el.nativeElement.querySelector('.genre-dropdown').contains(event.target);
  
    if (!isProfileDropdown && !isGenreDropdown) {
      this.closeDropdown();
      this.closeGenreDropdown();
    }
    // const isSearchInput = this.el.nativeElement.querySelector('.search-container').contains(event.target as HTMLElement);

    const isSearchInput = this.el.nativeElement.contains(event.target as HTMLElement);
    if (!isSearchInput) {
      this.collapseSearchBox();
      this.searchInput = "";
    }
  }



  isSearchVisible = false;

  toggleSearch() {
    if(this.isSearchVisible && this.searchInput)
    { 
      this.sharedService.searchInput.next(this.searchInput);
      // this.router.navigate(['/search']);
      this.router.navigate(['/movie']);

    }  

    else if(this.isSearchVisible){
      this.searchInput = '';
      this.sharedService.searchInput.next('');
      this.router.navigate(['/movie']);
    }
  
    else {
      this.isSearchVisible= !this.isSearchVisible;
       if (this.isSearchVisible) {
        setTimeout(() => {
          this.focusSearchInput();
        }, 0);
      }
    }
  }

  onEnterKey() {
    if (this.searchInput) {
      this.sharedService.searchInput.next(this.searchInput);
      // this.router.navigate(['/search']);
      this.router.navigate(['/movie']);

  
    }
    else {
      this.searchInput = '';
      this.sharedService.searchInput.next('');
      this.router.navigate(['/movie']);

    }
  
  }


  focusSearchInput() {
    if (this.searchInputRef) {
      this.searchInputRef.nativeElement.focus();
    }
  }

  collapseSearchBox() {
    this.isSearchVisible = false;
  }


  filterByGenre(genre: string) {
    
    this.sharedService.genreSelect.next(genre);
    this.isGenreDropdownOpen = false;
    // this.router.navigate(['/filter']);
  }
  
}
