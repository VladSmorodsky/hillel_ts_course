import {PriorityEnum} from "../enums/PriorityEnum";
import {TaskStatusEnum} from "../enums/TaskStatusEnum";
import {TaskTypeEnum} from "../enums/TaskTypeEnum";
import {Employee} from "./Employee";

export class Task {
    private _status: TaskStatusEnum;
    private _finishedTo: Date;
    private _employee: Employee;

    public get id(): number {
        return this._id;
    }

    public get status(): TaskStatusEnum {
        return this._status;
    }

    public set status(newStatus: TaskStatusEnum) {
        this._status = newStatus;
    }

    public get title(): string {
        return this._title;
    }

    public set title(newTitle: string) {
        this._title = newTitle;
    }

    public get employee(): Employee | null {
        return this._employee;
    }

    public set employee(employee: Employee | null) {
        this._employee = employee;
    }

    public get description(): string {
        return this._description;
    }

    public set description(newDescription: string) {
        this._description = newDescription;
    }

    public get priority(): PriorityEnum {
        return this._priority;
    }

    public set priority(priority: PriorityEnum) {
        this._priority = priority;
    }

    public get type(): TaskTypeEnum {
        return this._type;
    }

    public set type(type: TaskTypeEnum) {
        this._type = type;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get finishedTo(): Date {
        return this._finishedTo;
    }

    public set finishedTo(finishedAt: Date) {
        this._finishedTo = finishedAt;
    }

    constructor(
        private readonly _id: number,
        private _title: string,
        private _description: string,
        private _type: TaskTypeEnum,
        private _priority: PriorityEnum,
        private readonly _createdAt: Date
    ) {
        this._status = TaskStatusEnum.TODO;
    }

    public isComposite(): boolean {
        return this.type === TaskTypeEnum.STORY;
    }
}