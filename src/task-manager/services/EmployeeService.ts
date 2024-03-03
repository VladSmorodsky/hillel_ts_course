import {Employee} from "../models/Employee";
import {AppError} from "../errors/AppError";
import {PositionEnum} from "../enums/PositionEnum";

export class EmployeeService {
    private employees: Employee[] = [];

    public addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    public removeEmployee(deletedEmployee: Employee): void {
        this.employees = this.employees.filter(employee => employee.getId() !== deletedEmployee.getId());
    }

    public changeEmployeePosition(employee: Employee, position: PositionEnum): void {
        employee.setPosition(position);
    }

    public getEmployee(employeeId: number): Employee {
        const employee = this.employees.find(employeeItem => employeeItem.getId() === employeeId);

        if (!employee) {
            throw new AppError('Employee not found');
        }

        return employee;
    }
}