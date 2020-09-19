import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.styl']
})
export class ListOptionsComponent implements OnInit {
  optionsList: IOption[];
  @Input() isClosed: boolean;
  lang: string | 'en' | 'prs' | 'ps';
  currentSegment: string = null;

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.optionsList = LIST_DATA;
    this.lang = localStorage.getItem('lang')
    this.expandList(this.getParentUrlSegment(this.location.path()));
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.expandList(this.getParentUrlSegment(event.urlAfterRedirects));
    });
  }

  getParentUrlSegment(url: string): string {
    const urlArray = url.split('/')
    this.currentSegment = urlArray[urlArray.length - 1]
    return urlArray.length > 1 ? urlArray[2] : null;
  }

  expandList(urlSegment: string) {
    this.optionsList.forEach(item => {
      item.urlSegment === urlSegment ?
        item.is_expanded = true : item.is_expanded = false;
    })
  }
}

export interface IOption {
  name: string;
  icon: string;
  urlSegment: string;
  children?: IOption[];
  is_expanded?: boolean;
}

export const LIST_DATA: IOption[] = [
  {
    name: 'Orders & bills',
    icon: 'print',
    urlSegment: 'orders-bills',
    children: [
      {name: 'History', icon: 'print', urlSegment: 'history'},
      {name: 'Tables', icon: 'print', urlSegment: 'tables'},
      {name: 'Menu categories', icon: 'print', urlSegment: 'menu-categories'},
      {name: 'Menu items', icon: 'print', urlSegment: 'menu-items'},
    ]
  },
  {
    name: 'Providers',
    icon: 'local_cafe',
    urlSegment: 'providers'
  },
  {
    name: 'Expenses',
    icon: 'monetization_on',
    urlSegment: 'expenses'
  },
  {
    name: 'Stock',
    icon: 'store',
    urlSegment: 'stock',
    children: [
      {name: 'Manual usage', icon: 'store', urlSegment: 'manual-usage'},
      {name: 'Add / correction log', icon: 'store', urlSegment: 'add-correction-log'},
      {name: 'Usage log', icon: 'store', urlSegment: 'usage-log'},
    ]
  },
  {
    name: 'Employees',
    icon: 'people',
    urlSegment: 'employees',
    children: [
      {name: 'Leaves and absenties', icon: 'people', urlSegment: 'leaves-and-absenties'},
      {name: 'Advances', icon: 'people', urlSegment: 'advances'},
      {name: 'Payroll', icon: 'people', urlSegment: 'payroll'}
    ]
  },
  {
    name: 'Reports',
    icon: 'report',
    urlSegment: 'reports',
    children: [
      {name: 'Payments log', icon: 'report', urlSegment: 'payments-log'},
      {name: 'Daily summary report', icon: 'report', urlSegment: 'daily-summary-report'},
      {name: 'Items summary report', icon: 'report', urlSegment: 'items-summary-report'},
      {name: 'Categories summary report', icon: 'report', urlSegment: 'categories-summary-report'},
      {name: 'Debts', icon: 'report', urlSegment: 'debts'}
    ]
  },
  {
    name: 'Settings',
    icon: 'settings',
    urlSegment: 'settings',
    children: [
      {name: 'Users', icon: 'settings', urlSegment: 'users'}
    ]
  },
  {
    name: 'Notifications',
    icon: 'notifications',
    urlSegment: 'notifications'
  },
  {
    name: 'Logout',
    icon: 'power_settings_new',
    urlSegment: ''
  },

];

