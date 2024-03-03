import {EmployeeService} from "./services/EmployeeService";
import {TaskService} from "./services/TaskService";
import {PositionEnum} from "./enums/PositionEnum";
import {Employee} from "./models/Employee";
import {IdGenerator} from "./utils/IdGenerator";
import {AppError} from "./errors/AppError";
import {TaskTypeEnum} from "./enums/TaskTypeEnum";
import {PriorityEnum} from "./enums/PriorityEnum";
import {TaskBuilder} from "./builders/TaskBuilder";
import {Task} from "./models/Task";
import {Direction} from "./interfaces/ISortableStrategy";
import {ISortableTaskStrategy, SortableTaskFields} from "./interfaces/ISortableTaskStrategy";
import {BubbleSortTaskStrategy} from "./utils/Sorting/BubbleSortStrategy";
import {NotificationService} from "./services/NotificationService";
import {AppLogger} from "./utils/Logger/AppLogger";

export class TaskManager {
    private sortableStrategy: ISortableTaskStrategy = new BubbleSortTaskStrategy();
    private taskBuilder: TaskBuilder = new TaskBuilder();
    private employeeService: EmployeeService = new EmployeeService();
    private appLogger = new AppLogger();
    private taskService: TaskService;

    constructor(
        private notificationService: NotificationService
    ) {
        this.taskService = new TaskService(this.notificationService)
    }

    public getEmployee(user: Employee, employeeId: number): Employee {
        return this.employeeService.getEmployee(employeeId);
    }

    public createEmployee(firstName: string, lastName: string, position: PositionEnum): void {
        const employee = new Employee(IdGenerator.generateEmployeeId(), firstName, lastName, position);
        this.employeeService.addEmployee(employee);
        this.appLogger.log({
            employee: employee,
            action: 'create',
            data: employee,
            time: new Date()
        })
    }

    public removeEmployee(employeeId: number): void {
        const employee = this.employeeService.getEmployee(employeeId);
        const employeeTasks = this.taskService.getEmployeeTasks(employee);

        if (employeeTasks.length) {
            throw new AppError(`Please reassign employee ${employee.name} tasks first`)
        }

        this.employeeService.removeEmployee(employee);

        this.appLogger.log({
            employee: employee,
            action: 'delete',
            data: employee,
            time: new Date()
        })
    }

    public assignEmployee(employee: Employee, taskId: number): void {
        this.taskService.addEmployeeForTask(employee, taskId);
        this.appLogger.log({
            employee: employee,
            action: 'update',
            data: employee,
            time: new Date()
        })
    }


    public createTask(employee: Employee, title: string, type: TaskTypeEnum, description: string = '', priority: PriorityEnum = PriorityEnum.LOW): void {
        const newTask = this.taskBuilder.createTaskItem(title, description, priority, type);
        this.taskService.addTask(newTask);
        this.appLogger.log({
            employee: employee,
            action: 'create',
            data: newTask,
            time: new Date()
        });
    }

    public updateTask(employee: Employee, updatedTask: Task): void {
        if (!employee.hasAdminRights()) {
            throw new AppError(`Employee ${employee.name} has no permissions to update task`)
        }

        this.taskService.editTask(updatedTask);
        this.appLogger.log({
            employee: employee,
            action: 'update',
            data: updatedTask,
            time: new Date()
        });
    }

    public deleteTask(employee: Employee, removedTask: Task): void {
        if (!employee.hasAdminRights()) {
            throw new AppError(`Employee ${employee.name} has no permissions to remove task`)
        }

        this.taskService.removeTask(removedTask);
        this.appLogger.log({
            employee: employee,
            action: 'delete',
            data: removedTask,
            time: new Date()
        });
    }

    public sortTasksByField(sortableField: SortableTaskFields, direction: Direction): Task[] {
        return this.sortableStrategy.sort(this.taskService.taskList, sortableField, direction);
    }

    public setSortStrategy(sortStrategy: ISortableTaskStrategy): void {
        this.sortableStrategy = sortStrategy;
    }
}