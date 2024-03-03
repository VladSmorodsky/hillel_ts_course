import {Task} from "../models/Task";
import {TaskStatusEnum} from "../enums/TaskStatusEnum";
import {Employee} from "../models/Employee";
import {IFilterable} from "../interfaces/IFilterable";
import {NotificationService} from "./NotificationService";
import {AppError} from "../errors/AppError";
import {ISortableTaskStrategy, SortableTaskFields} from "../interfaces/ISortableTaskStrategy";
import {Direction} from "../interfaces/ISortableStrategy";
import {BubbleSortTaskStrategy} from "../utils/Sorting/BubbleSortStrategy";

type TaskFilter = Partial<Task>

export class TaskService implements IFilterable<Task, TaskFilter> {
    private sortableStrategy: ISortableTaskStrategy = new BubbleSortTaskStrategy();
    private _taskList: Task[] = [];

    public get taskList(): Task[] {
        return this._taskList;
    }

    constructor(private notificationService: NotificationService) {
    }

    public addTask(task: Task): void {
        this.taskList.push(task);
    }

    public removeTask(removedTask: Task): void {
        this._taskList = this.taskList.filter(task => task.id !== removedTask.id);
    }

    public editTask(updatedTask: Task): void {
        const task = this.findTaskById(updatedTask.id);

        Object.assign(task, updatedTask);
    }

    public getTask(taskId: number): Task {
        return this.findTaskById(taskId);
    }

    public changeTaskStatus(taskId: number, newStatus: TaskStatusEnum): void {
        const task = this.findTaskById(taskId);

        if (!task.employee) {
            throw new AppError('Please assign employee for task');
        }

        const prevStatus = task.status;
        task.status = newStatus;

        this.notificationService.notify(`Task #${task.id} status was changed from '${prevStatus}' to '${newStatus}'`);
    }

    public addEmployeeForTask(employee: Employee, taskId: number): void {
        const foundTask = this.findTaskById(taskId);

        foundTask.employee = employee;
    }

    public getEmployeeTasks(employee: Employee): Task[] {
        return this.taskList.filter(task => task.employee === employee);
    }

    public removeEmployeeForTask(task: Task): void {
        const foundTask = this.findTaskById(task.id);

        foundTask.employee = null;
    }

    public filter(filterObject: TaskFilter): Task[] {
        return this._taskList.filter(task => {
            const taskMatchedValues = Object.keys(filterObject).filter((key: keyof TaskFilter) => {
                return task[key] === filterObject[key];
            });

            return taskMatchedValues.length === Object.keys(filterObject).length;
        });
    }

    public sortTasksByField(sortableField: SortableTaskFields, direction: Direction): Task[] {
        return this.sortableStrategy.sort(this.taskList, sortableField, direction);
    }

    public setSortStrategy(sortStrategy: ISortableTaskStrategy): void {
        this.sortableStrategy = sortStrategy;
    }

    private findTaskById(taskId: number): Task {
        const foundTask = this.taskList.find(taskItem => taskItem.id === taskId);

        if (!foundTask) {
            throw new AppError('Task not found');
        }

        return foundTask;
    }
}