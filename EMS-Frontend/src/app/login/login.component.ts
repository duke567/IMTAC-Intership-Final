// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {

  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.credentials.username, this.credentials.password).pipe(
      tap((response) => {
        console.log('Login response:', response);
        localStorage.setItem('employeeId', response.employeeId.toString()); 
  
        if (response.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'employee') {
          this.router.navigate(['/employee']);
        } else {
          console.error('Unknown role');
        }
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(null);
      })
    ).subscribe();
  }
  
}
  
