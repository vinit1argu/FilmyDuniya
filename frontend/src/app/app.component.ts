import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Filmyduniya';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  shouldShowHeader(): boolean {
    
    return !this.router.url.includes('/login') && !this.router.url.includes('/register');
  }

  shouldShowFooter(): boolean {
    
    return !this.router.url.includes('/login') && !this.router.url.includes('/register');
  }



  shouldApplyPadding(): boolean {
    const currentRoute = this.router.url;
    return ['/login', '/register'].includes(currentRoute);
  }
}
