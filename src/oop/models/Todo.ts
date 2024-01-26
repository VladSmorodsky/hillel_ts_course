import {ITodo} from "../interfaces/ITodo";
import {v4 as uuidv4} from 'uuid';


export class Todo implements ITodo{
    readonly id: string;
    readonly createdAt: number;
    updatedAt: number;
    isCompleted: boolean = false;

    constructor(
        public title: string,
        public description: string = '',
    ) {
        this.id = uuidv4();
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }

    public getId(): string {
        return this.id;
    }

    public markAsCompleted(): void {
        this.isCompleted = true;
    }

    public getCreatedAt(): Date {
        return new Date(this.createdAt);
    }

    public update(todo: Partial<Omit<ITodo, 'id'>>): void {
        Object.assign(this, todo);
        this.updatedAt = Date.now();
        // Object.keys(todo).forEach((key: keyof Todo) => {
        //     this[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](todo[key]);
        // })
    }
}