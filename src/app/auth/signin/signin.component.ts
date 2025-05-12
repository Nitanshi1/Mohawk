import { Component, inject, OnInit } from '@angular/core';
import {
FormBuilder,
FormGroup,
ReactiveFormsModule,
Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
// import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-signin',
  standalone: true,
 imports: [
MatInputModule,
MatFormFieldModule,
MatButtonModule,
MatIconModule,
ReactiveFormsModule,

NgIf,
MatCheckboxModule,
MatProgressSpinnerModule,
],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

signinForm!: FormGroup;
hidePassword = true;
formSubmitted: boolean = false;
loading: boolean = false;
private _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
constructor(
private fb: FormBuilder,
private router: Router,
// private authService: AuthService
) {
this.initForm();
}
 
ngOnInit(): void {
const savedCredentials = this.getSavedCredentials();
if (savedCredentials) {
this.signinForm.patchValue({
email: savedCredentials.email,
password: savedCredentials.password,
rememberMe: true,
});
}
}
 
initForm() {
this.signinForm = this.fb.group({
email: [
'',
[
Validators.required,
Validators.pattern(
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
),
],
],
password: [
'',
[
Validators.required,
Validators.minLength(8), // Minimum length of 8 characters
Validators.pattern(
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/
),
],
],
rememberMe: [false],
});
}
 
togglePasswordVisibility() {
this.hidePassword = !this.hidePassword;
}
 
onSubmit() {
// this.formSubmitted = true;
 
// if (this.signinForm.invalid) {
// this.signinForm.markAllAsTouched(); // This will trigger validation messages
// return;
// }
 
// if (this.signinForm.valid) {
// const { email, password, rememberMe } = this.signinForm.value;
 
// // Handle remember me functionality
// if (rememberMe) {
// this.saveCredentials(email, password);
// } else {
// this.clearSavedCredentials();
// }
// this.loading = true;
 
// this.authService.login(email, password).subscribe({
// next: (response: any) => {
// this.loading = false;
// this.authService.saveAuthData(response.access_token, response.role);
// if (response.role == 'user') {
// if (response.access_token) {
// const decodedtoken = jwtDecode(response.access_token);
// if (decodedtoken && decodedtoken.sub) {
// this.router.navigate([`/chatbots/${decodedtoken.sub}`]);
// }
// }
// } else {
// this.router.navigate(['/dashboard']);
// }
// },
// error: (error: any) => {
// this.loading = false;
// const errorMessage = error.error?.detail;
// Swal.fire('Error', errorMessage, 'error');
// },
// });
// }
}
 
private saveCredentials(email: string, password: string) {
// Encrypt password before storing (basic encryption - you might want to use a more secure method)
const encodedPassword = btoa(password);
localStorage.setItem(
'rememberedCredentials',
JSON.stringify({
email,
password: encodedPassword,
})
);
}
 
private clearSavedCredentials() {
localStorage.removeItem('rememberedCredentials');
}
 
hide = signal(true);
clickEvent(event: MouseEvent) {
this.hide.set(!this.hide());
}
 
onForgotPassword() {
this.router.navigate(['/forgotpassword']);
}
 
showError(errorMessage: string) {
Swal.fire({
icon: 'error',
title: 'Error!',
text: errorMessage,
confirmButtonColor: '#d33',
});
}
 
private getSavedCredentials(): { email: string; password: string } | null {
const savedCredentials = localStorage.getItem('rememberedCredentials');
if (savedCredentials) {
const credentials = JSON.parse(savedCredentials);
return {
email: credentials.email,
password: atob(credentials.password),
};
}
return null;
}
}