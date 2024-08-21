import { Component, OnInit } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { tap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [RouterOutlet,RouterModule],
  standalone: true,
})
export class AdminDashboardComponent implements OnInit {

  employees: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().pipe(
      tap(data => {
        console.log('Data fetched:', data);
        this.employees = data;
      })
    ).subscribe({
      error: error => {
        console.error('Error fetching employees', error);
      }
    });
  }
  viewEmployee(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees(); // Reload the employee list after deletion
    }, error => {
      console.error('Error deleting employee', error);
    });
  }
}
