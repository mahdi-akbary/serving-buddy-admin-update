import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {
  title: string = 'Tea Talk'
  nameIcon: string = 'T-T'
  isClosed: boolean = false;


  constructor() {

  }

  ngOnInit(): void {
  }

}
