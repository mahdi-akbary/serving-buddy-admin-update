import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {

  isClosed: boolean = false;


  constructor() {

  }

  ngOnInit(): void {
  }

}
