import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.styl']
})
export class ListOptionsComponent implements OnInit {
  data: IOption[];
  @Input() isClosed: boolean;
  constructor() {
  }

  ngOnInit(): void {
    this.data = TREE_DATA;
  }

  expandList(option: IOption) {
    this.data.forEach(item => {
      item.name === option.name ?
        item.is_expanded = true : item.is_expanded = false;
    })
  }
}

interface IOption {
  name: string;
  icon: string;
  link: string;
  children?: IOption[];
  is_expanded?: boolean;
}

const TREE_DATA: IOption[] = [
  {
    name: 'Orders & bills',
    icon: 'print',
    link: '/orders',
    children: [
      {name: 'History', icon: 'print', link: '/orders/history'},
      {name: 'Tables', icon: 'print', link: '/orders/tables'},
      {name: 'Menu categories', icon: 'print', link: '/orders/menuCategories'},
      {name: 'Menu items', icon: 'print', link: '/orders/menuItems'},
    ]
  },
  {
    name: 'Providers',
    icon: 'local_cafe',
    link: '/providers'
  },
  {
    name: 'Expenses',
    icon: 'monetization_on',
    link: '/expenses'
  },
  {
    name: 'Stock',
    icon: 'store',
    link: '/stock',
    children: [
      {name: 'Manual usage', icon: 'store', link: '/stock/manualUsage'},
      {name: 'Add / correction log', icon: 'store', link: '/stock/addCorrectionLog'},
      {name: 'Usage log', icon: 'store', link: '/stock/usageLog'},
    ]
  },
  {
    name: 'Employees',
    icon: 'people',
    link: '/employees',
    children: [
      {name: 'Leaves and absenties', icon: 'people', link: '/employees/leavesAndAbsenties'},
      {name: 'Advances', icon: 'people', link: '/employees/advances'},
      {name: 'Payroll', icon: 'people', link: '/employees/payroll'}
    ]
  },
  {
    name: 'Reports',
    icon: 'report',
    link: '/reports',
    children: [
      {name: 'Payments log', icon: 'report', link: '/reports/paymentsLog'},
      {name: 'Daily summary report', icon: 'report', link: '/reports/dailySummaryReport'},
      {name: 'Items summary report', icon: 'report', link: '/reports/itemsSummaryReport'},
      {name: 'Categories summary report', icon: 'report', link: '/reports/categoriesSummaryReport'},
      {name: 'Debts', icon: 'report', link: '/reports/debts'}
    ]
  },
  {
    name: 'Settings',
    icon: 'settings',
    link: '/settings',
    children: [
      {name: 'Users', icon: 'settings', link: '/settings/users'}
    ]
  },
  {
    name: 'Notifications',
    icon: 'notifications',
    link: '/notifications'
  },
  {
    name: 'Logout',
    icon: 'power_settings_new',
    link: ''
  },

];

