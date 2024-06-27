import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Filmyduniya';
  currentUrl: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

  }

  ngOnInit(): void {}

  shouldShowHeader(): boolean {
    return !this.isAuthRoute() && !this.isNotFoundRoute();
  }

  shouldShowFooter(): boolean {
    return !this.isAuthRoute() && !this.isNotFoundRoute();
  }

  shouldApplyPadding(): boolean {
    return this.isAuthRoute() || this.isNotFoundRoute();
  }

  private isAuthRoute(): boolean {
    return this.currentUrl.includes('/login') || this.currentUrl.includes('/register');
  }

  private isNotFoundRoute(): boolean {
    return this.router.routerState.snapshot.root?.firstChild?.routeConfig?.path === '**';
  }
}