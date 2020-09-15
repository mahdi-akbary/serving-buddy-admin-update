import {Component} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  showFiller: boolean = false;
  isClosed: boolean = false;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}


interface FoodNode {
  name: string;
  icon: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Orders & bills',
    icon: 'print',
    children: [
      {name: 'History', icon: 'print'},
      {name: 'Tables', icon: 'print'},
      {name: 'Menu categories', icon: 'print'},
      {name: 'Menu items', icon: 'print'},
    ]
  },
  {
    name: 'Providers',
    icon: 'local_cafe'
  },
  {
    name: 'Expenses',
    icon: 'monetization_on',
  },
  {
    name: 'Stock',
    icon: 'store',
    children: [
      {name: 'Manual usage', icon: 'store'},
      {name: 'Add / correction log', icon: 'store'},
      {name: 'Usage log', icon: 'store'},
    ]
  },
  {
    name: 'Employees',
    icon: 'people',
    children: [
      {name: 'Leaves and absenties', icon: 'people'},
      {name: 'Advances', icon: 'people'},
      {name: 'Payroll', icon: 'people'}
    ]
  },
  {
    name: 'Reports',
    icon: 'report',
    children: [
      {name: 'Payments log', icon: 'report'},
      {name: 'Daily summary report', icon: 'report'},
      {name: 'Items summary report', icon: 'report'},
      {name: 'Categories summary report', icon: 'report'},
      {name: 'Debts', icon: 'report'}
    ]
  },
  {
    name: 'Settings',
    icon: 'settings',
    children: [
      {name: 'Users', icon: 'settings'}
    ]
  },
  {
    name: 'Notifications',
    icon: 'notifications'
  },
  {
    name: 'Logout',
    icon: 'power_settings_new'
  },

];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
