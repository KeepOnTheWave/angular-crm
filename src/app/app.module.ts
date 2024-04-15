import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderComponent} from "./header/header.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MainComponent} from "./main/main.component";
import {DeleteClientDialogComponent} from "./delete-client-dialog/delete-client-dialog.component";
import {AddClientDialogComponent} from "./add-client-dialog/add-client-dialog.component";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import localeRu from '@angular/common/locales/ru';

import "moment/locale/ru.js";
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeRu);

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HeaderComponent,
    MainComponent,
    DeleteClientDialogComponent,
    AddClientDialogComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru" },
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
