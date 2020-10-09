import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.styl']
})
export class ViewElementComponent {

  @Input() expandable: boolean;
  @Input() expandText: { more: string; less: string };
  isExpanded: boolean;

  constructor() {
    this.isExpanded = this.expandable
  }
}
