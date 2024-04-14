import {ApplicationConfig, LOCALE_ID} from "@angular/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import "moment/locale/ru.js";

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


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: "ru" },
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
}
