import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private apiUrl = `${environment.apiUrl}/Employee`

  constructor(private http: HttpClient) { }
  getEmployee(): Observable<Employee[]>
  {
 return this.http.get<Employee[]>(this.apiUrl)
  }
  createEmployee(employee:Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl,employee)
  }
  getEmployeeById(id:number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`,employee)
  }
}
