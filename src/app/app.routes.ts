import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { MainComponent } from './layouts/main/main.component';
import { StartchatComponent } from './layouts/startchat/startchat.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ChatbotComponent } from './layouts/chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' }, 
  { path: 'signIn', component: SigninComponent },
  { path: 'main', component: MainComponent },
  { path: 'chat', component: StartchatComponent },
  { path: 'sidebar', component:SidebarComponent },
  { path: 'chatbot', component:ChatbotComponent },



  { path: '**', redirectTo: 'signIn' } 

];
