import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { MainComponent } from './layouts/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' }, 
  { path: 'signIn', component: SigninComponent },
  { path: 'main', component: MainComponent },
  { path: '**', redirectTo: 'signIn' } 

];
