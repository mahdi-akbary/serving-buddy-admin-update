import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Breadcrumb} from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent implements OnInit {

  breadcrumbData: Breadcrumb;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.init()
  }
}


