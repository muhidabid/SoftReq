import { Location, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  navigationSubscription;
  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private location: Location
    // private router: Router
  ) {
  //   // subscribe to the router events. Store the subscription so we can
  //  // unsubscribe later.
  //  this.navigationSubscription = this.router.events.subscribe((e: any) => {
  //   // If it is a NavigationEnd event re-initalise the component
  //   if (e instanceof NavigationEnd) {
  //     this.initialiseInvites();
  //   }
  // });
  }

  ngOnInit(): void {
    // replaceState(path: string, query: string = '', state: any = null): void
   this.location.replaceState('/home-page');
  }

  // ngOnDestroy() {
  //   if (this.navigationSubscription) {
  //     this.navigationSubscription.unsubscribe();
  //   }
  // }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
  }

  ngAfterViewInit(): void {
    this.route.fragment
      // .pipe(first())
      .subscribe(fragment => {
        this.viewportScroller.scrollToAnchor(fragment);
      });

  }

}
