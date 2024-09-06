import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navToSection(): void {
    this.router.navigate(['/home-page'], {
      // skipLocationChange: true,
      relativeTo: this.route,
      // onSameUrlNavigation: 'reload',
      queryParamsHandling: 'merge',
      fragment: 'about-section'
    });
  }
}
