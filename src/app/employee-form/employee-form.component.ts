import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { popResultSelector } from 'rxjs/internal/util/args';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})

export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }

  isEditing: boolean = false;

  errorMessage:string = "";


constructor(private employeeService: EmployeeService, 
  private router: Router,
  private route: ActivatedRoute
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe((result) => {
    const id = result.get('id');
    if (id) 
    {
      this.isEditing= true;
      this.employeeService.getEmployeeById(Number(id)).subscribe({
        next: (result) => this.employee = result,
        error: (err) => console.log("Exploto:",err)
      })
     
    }
    
  } );
}
  onSubmint(): void {

    if(this.isEditing){
      this.employeeService.editEmployee(this.employee)
      .subscribe({
        next:() => {
          this.router.navigate(['/'])
        },
        error:(err) => {
          console.error(err);
          this.errorMessage = `Error updating employee : ${err.status} - ${err.message}`;
        }
      });
    }
    else{
      console.log(this.employee);
      this.employeeService.createEmployee(this.employee)
      .subscribe({
        next:() => {
          this.router.navigate(['/'])
        },
        error:(err) => {
          console.error(err);
          this.errorMessage = `Error: ${err.status} - ${err.message}`;
        }
      });
    }
   
  }
}
