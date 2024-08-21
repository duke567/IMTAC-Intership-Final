// employee-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { EmployeeService } from '../Services/employee.service';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  standalone :true,
  imports:[FormsModule,CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employee: any;

  constructor(private authService: AuthService, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    const employeeIdStr = localStorage.getItem('employeeId'); 
    if (employeeIdStr) {
      const employeeId = parseInt(employeeIdStr, 10);
      this.loadEmployee(employeeId);
    }
    
  }
  
  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).pipe(
      tap((data) => {
        this.employee = data;
        console.log('Employee data:', this.employee);
      }),
      catchError((error) => {
        console.error('Error fetching employee data', error);
        return of(null);
      })
    ).subscribe();
  }
  
  viewProfile(): void {
    this.router.navigate(['/employees', this.employee.id]);
  }
  
  editProfile(): void {
    this.router.navigate(['updating-by-id', this.employee.id]);
  }
}  
