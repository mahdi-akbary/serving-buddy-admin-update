import {Injectable} from "@angular/core";

@Injectable()
export class StaticDataService {
  statues = [
    'Enabled',
    'Disabled'
  ];

  providers = [
    'None',
    'Hookah',
    'Kitchen',
  ];

  printers = [
    '',
    'Fast food',
    'Juice and Tea',
    'Main food',
  ];

  toMonitorProviders = [
    'Hookah',
    'Kitchen',
  ];

  userTypes = [
    'Director', 'Counter', 'Waiter', 'Kitchen', 'Hookah'
  ];

  dayTypes = [
    'Absent', 'Leave'
  ];

  yesNoOptions = [
    'Yes', 'No'
  ];

  stockUnits = [
    'Bottle',
    'Box',
    'Can',
    'Crate',
    'Charak',
    'Kilo',
    'Khurd',
    'Sack',
    'Ser',
    'Piece',
    'Other',
  ];

  months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];

  days = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
}
