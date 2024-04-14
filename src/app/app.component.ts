import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {MainComponent} from "./main/main.component";
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, MainComponent],
})
export class AppComponent {
  constructor(
    private adapter: DateAdapter<any>
  ) {
    adapter.setLocale("ru")
  }
}
