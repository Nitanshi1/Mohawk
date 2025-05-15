import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { MainComponent } from './layouts/main/main.component';
import { StartchatComponent } from './layouts/startchat/startchat.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

import { DislikeModalComponent } from './shared/modals/dislike-modal/dislike-modal.component';
import { SqlModalComponent } from './shared/modals/sql-modal/sql-modal.component';



export const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' }, 
  { path: 'signIn', component: SigninComponent },
  { path: 'main', component: MainComponent },
  { path: 'chat', component: StartchatComponent },
  { path: 'sidebar', component:SidebarComponent },

  { path: 'modal', component:SqlModalComponent },

  { path: 'feedback', component:DislikeModalComponent },


  { path: '**', redirectTo: 'signIn' } 

];
