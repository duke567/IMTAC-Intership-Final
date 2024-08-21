import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../Services/employee.service';
import { Router,RouterModule,RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor,RouterModule,RouterOutlet],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService,private router: Router) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  deleteEmployee(id: number){
    if(confirm("Are you sure to delete Employee ID: "+ id)){
    this.employeeService.deleteEmployee(id).subscribe( data => {
    })}
    window.location.reload();
  }
  updateEmployee(id: number){
    this.router.navigate(['updating-by-id', id]);
  }
}
