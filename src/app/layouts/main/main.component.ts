import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
