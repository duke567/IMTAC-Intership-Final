import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-edit-empl',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: 'employee-edit.component.html',
})
export class EmployeeEditComponent implements OnInit {

  id: number;
  employee: Employee;
  editForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.id = 0;
    this.employee = new Employee;
    this.editForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      joining_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe({
      next: data => {
        this.employee = data;
        this.editForm.patchValue({
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          email: this.employee.email,
          phone_number: this.employee.phone_number,
          position: this.employee.position,
          department: this.employee.department,
          date_of_birth: this.employee.date_of_birth,
          joining_date: this.employee.joining_date
        });
      },
      error: error => console.error(error)
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.employeeService.updateEmployee(this.id, this.editForm.value).subscribe({
        next: data => {
          this.goToEmployeeList();
        },
        error: error => console.error(error)
      });
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/adminSignIn/emplist']);
  }
}
