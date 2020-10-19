import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ViewElementComponent} from "./components/view-element/view-element.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {JalaliDatetimePipe} from './pipes/jalali-datetime.pipe';
import {JalaliDatePipe} from './pipes/jalali-date.pipe';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  FlexLayoutModule,
  MatExpansionModule
];

@NgModule({
  imports: modules,
  exports: [
    ...modules,
    ViewElementComponent,
    JalaliDatetimePipe,
    JalaliDatePipe
  ],
  declarations: [
    ViewElementComponent,
    JalaliDatetimePipe,
    JalaliDatePipe
  ]
})
export class SharedModule {
}
