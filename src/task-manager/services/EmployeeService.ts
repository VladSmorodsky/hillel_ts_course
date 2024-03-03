import {Employee} from "../models/Employee";
import {AppError} from "../errors/AppError";
import {PositionEnum} from "../enums/PositionEnum";

export class EmployeeService {
    private employees: Employee[] = [];

    public getEmployees(): Employee[] {
        return this.employees;
    }

    public addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    public removeEmployee(deletedEmployee: Employee): void {
        this.employees = this.employees.filter(employee => employee.id !== deletedEmployee.id);
    }

    public changeEmployeePosition(employee: Employee, position: PositionEnum): void {
        employee.position = position;
    }

    public getEmployee(employeeId: number): Employee {
        const employee = this.employees.find(employeeItem => employeeItem.id === employeeId);

        if (!employee) {
            throw new AppError('Employee not found');
        }

        return employee;
    }

    public updateEmployee(updateEmployeeObject: Employee): void {
        const employee = this.getEmployee(updateEmployeeObject.id);

        Object.assign(employee, updateEmployeeObject);
    }
}