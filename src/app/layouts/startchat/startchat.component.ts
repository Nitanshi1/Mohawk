import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-startchat',
  standalone: true,
  imports: [MaterialModule,SidebarComponent ],
  templateUrl: './startchat.component.html',
  styleUrl: './startchat.component.scss'
})
export class StartchatComponent {

}
