import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service'; // Adjust the path according to your project structure
import { FormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports : [FormsModule,CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.user.password.length < 8 || !/[A-Z]/.test(this.user.password) || 
      !/[a-z]/.test(this.user.password) || !/\d/.test(this.user.password) || 
      !/[!@#$%^&*(),.?":{}|<>]/.test(this.user.password)) {
    console.error('Password does not meet strength requirements');
    return;
  }
    this.authService.saveUser(this.user).pipe(
      tap(response => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Error registering user:', error);
        return of(null); // Return an observable in case of error
      })
    ).subscribe();
  }
}
