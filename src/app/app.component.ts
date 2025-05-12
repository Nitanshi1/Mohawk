import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from "./auth/signin/signin.component";
import { MainComponent } from "./layouts/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SigninComponent, MainComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mohawk_Frontend';
}
