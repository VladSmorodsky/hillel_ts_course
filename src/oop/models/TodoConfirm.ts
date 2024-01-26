import {Todo} from "./Todo";
import {ITodo} from "../interfaces/ITodo";

export class TodoConfirm extends Todo {
    constructor(
        public title: string,
        public description: string,
        public confirm: () => boolean
    ) {
        super(title, description);
    }

    public update(todo: Partial<ITodo>): void {
        if (this.confirm()) {
            super.update(todo);
        }
    }
}