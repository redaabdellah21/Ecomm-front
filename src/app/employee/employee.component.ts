import { Component, OnInit } from '@angular/core';
import {Employee} from "../model/employee";
import {EmployeeService} from "../services/employee.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private _currentTime: any;
  get employees(): Employee[] | undefined {
    return this._employees;
  }
  set employees(value: Employee[] | undefined) {
    this._employees = value;
  }
  get emploloyeeService(): EmployeeService {
    return this._emploloyeeService;
  }
  set emploloyeeService(value: EmployeeService) {
    this._emploloyeeService = value;
  }
  public _employees : Employee[] | undefined;
  public editeEmployee : Employee| undefined;
  public deleteEmployee : Employee| undefined;
  constructor(private _emploloyeeService : EmployeeService, public app : AppComponent) { }
  ngOnInit(): void {
    this.app.s=false;
    this.getEmployees();
  }
  public getEmployees(): void
  {
    // @ts-ignore
    this._emploloyeeService.getEmployees().subscribe(
      (data)=>{
        this._employees = data;
      },(error=>alert(error.message) )

    );
  }

onEditChange(employee : Employee){
    this.editeEmployee=employee;
}
  ondeleteChange(employee : Employee){
    this.deleteEmployee=employee;
  }

  onAddEmployee(addForm: NgForm) : void{
    // @ts-ignore
    document.getElementById("btnCloseform").click();
    this.emploloyeeService.addEmployees(addForm.value).subscribe(
      (response :  Employee)=>{
        console.log(response);
      this.getEmployees();
      addForm.reset();
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );


  }

  getTS() {
    return this._currentTime;
  }

  onUpdateEmployee(employee : Employee) : void{
    // @ts-ignore
    this.emploloyeeService.updateEmployees(employee).subscribe(
      (response :  Employee)=>{
        console.log(response);
        this._currentTime=Date.now();
        this.getEmployees();
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    // @ts-ignore
    document.getElementById("btnEditCloseform").click();

  }
  onDeleteEmployee(employeeId : number) : void{
    // @ts-ignore
    this.emploloyeeService.deleteEmployees(employeeId).subscribe(
      (response :  void)=>{
        console.log(response);
        this.getEmployees();
      },
      (error :  HttpErrorResponse)=>{
        alert(error.message);
      }
    );

  }

  onSearchProduct(key: string) {
    const resultat: Employee[]=[];
    // @ts-ignore
    for(const employee of this._employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1){
        resultat.push(employee);
      }
    }
    this._employees=resultat;
    if(resultat.length===0||!key){
      this.getEmployees();
    }

  }
}
