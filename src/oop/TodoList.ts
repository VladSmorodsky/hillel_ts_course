import {ITodo} from "./interfaces/ITodo";
import {Todo} from "./models/Todo";
import {ISortable, SortDirection} from "./interfaces/ISortable";
import {ISearchable} from "./interfaces/ISearchable";

type TodoSortKey = keyof Pick<ITodo, 'isCompleted' | 'createdAt'>

export class TodoList implements ISortable<ITodo, TodoSortKey>, ISearchable<ITodo> {
    private todos: ITodo[] = [];

    public getList(): ITodo[] {
        return this.todos;
    }

    public getTodoById(todoId: string): ITodo {
        return this.todos.find(todo => todo.getId() === todoId);
    }

    public getNotDoneTodoCount(): number {
        return this.todos.filter(todo => !todo.isCompleted).length;
    }

    public getTodoCount(): number {
        return this.todos.length;
    }

    public add(todo: Todo): void {
        this.todos.push(todo);
    }

    public edit(todoId: string, updatedTodo: Partial<ITodo>): void {
        const todo: ITodo = this.todos.find((todo: ITodo) => todo.getId() === todoId);

        if (!todo) {
            throw new Error(`Todo with id ${todoId} not found`);
        }

        todo.update(updatedTodo);
    }

    public delete(todoId: string): void {
        this.todos = this.todos.filter((todo: Todo) => todo.getId() !== todoId);
    }

    public sort(sortKey: TodoSortKey, direction: SortDirection): ITodo[] {
        if (sortKey === 'isCompleted') {
            return this.todos.sort((todoA, todoB) => +todoA.isCompleted - +(todoB.isCompleted));
        }

        return this.todos.sort(
            (todoA, todoB) => {
                const a = todoA[`get${String(sortKey).charAt(0).toUpperCase() + String(sortKey).slice(1)}`]();
                const b = todoB[`get${String(sortKey).charAt(0).toUpperCase() + String(sortKey).slice(1)}`]();

                if (direction === 'desc') {
                    return a > b ? -1 : 1;
                }

                return b > a ? -1 : 1;
            }
        );
    }

    public search(searchValue: string): ITodo[] {
        return this.todos.filter(todo =>
            Object.entries(todo).some(todoValue =>
                String(todoValue[1]).toLowerCase().includes(searchValue.toLowerCase()))
        );
    }
}