import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.styl']
})
export class ViewElementComponent {

  @Input() npaLabel: string;
  @Input() for: string;
  @Input() expandable: boolean;
  @Input() expandText: { more: string; less: string };
  isExpanded;

  constructor() {
    this.isExpanded = this.expandable
  }
}
