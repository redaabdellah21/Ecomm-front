import { Injectable } from '@angular/core';
import {Employee} from "../model/employee";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public url='http://localhost:8080';
  constructor(private http : HttpClient) { }
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.url}/employee/all`);
  }
  public addEmployees(employee : Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.url}/employee/add`,employee);
  }
  public updateEmployees(employee : Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.url}/employee/update`,employee);
  }
  public deleteEmployees(employeeId : number): Observable<void>{
    return this.http.delete<void>(`${this.url}/employee/delete/${employeeId}`);
  }
}



