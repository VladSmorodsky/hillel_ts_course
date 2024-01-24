import {v4 as uuidv4} from 'uuid';
const {confirm} = require('@inquirer/prompts')

type TodoStatus = 'todo' | 'done';
type SortDirection = 'desc' | 'asc';
type TodoSortKey = keyof Pick<ITodo, 'status' | 'createdAt'>


interface ITodo {
    id: uuidv4,
    title: string,
    description: string | null,
    createdAt: number,
    updatedAt: number,
    status: TodoStatus
}

class Todo {
    private readonly id: uuidv4;
    private readonly createdAt: number;
    private updatedAt: number;
    private status: TodoStatus;

    constructor(
        private title: string,
        private description: string | null = null,
    ) {
        this.id = uuidv4();
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.status = 'todo';
    }

    public getId(): uuidv4 {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    protected setTitle(title: string): void {
        this.title = title;
        this.updatedAt = Date.now();
    }

    public getDescription(): string {
        return this.description;
    }

    protected setDescription(description: string): void {
        this.description = description;
        this.updatedAt = Date.now();
    }

    public getStatus(): TodoStatus {
        return this.status;
    }

    protected setStatus(status: TodoStatus): void {
        this.status = status;
        this.updatedAt = Date.now();
    }

    public getUpdatedAt(): Date {
        return new Date(this.updatedAt);
    }

    public getCreatedAt(): Date {
        return new Date(this.createdAt);
    }

    public update(todo: Partial<ITodo>): void {
        Object.keys(todo).forEach((key: keyof Todo) => {
            this[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](todo[key]);
        })
    }
}

class TodoWithConfirmation extends Todo {
    public update(todo: Partial<ITodo>): void {
        this.confirm().then((isConfirmed: boolean) => {
            if (isConfirmed) {
                super.update(todo);
            }
        })
    }

    private async confirm(): Promise<boolean> {
        return (async (): Promise<boolean> => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await confirm({message: 'Do you want to update field?'});
        })();
    }
}

abstract class SortableList<T, L> {
    public abstract sort(key: keyof T, direction: SortDirection): L[]
}

class TodoList extends SortableList<TodoSortKey, Todo> {
    private todos: Todo[] = [];

    public getList(): Todo[] {
        return this.todos;
    }

    public getTodo(todoId: uuidv4): Todo {
        return this.todos.find(todo => todo.getId() === todoId);
    }

    public getNotDoneTodoCount(): number {
        return this.todos.filter(todo => todo.getStatus() !== 'done').length;
    }

    public getTodoCount(): number {
        return this.todos.length;
    }

    public add(todo: Todo): void {
        this.todos.push(todo);
    }

    public search(todoSearchObject: Partial<ITodo>): Todo[] {
        let searchedTodos: Todo[] = this.todos;

        Object.keys(todoSearchObject).forEach(searchTodoKey => {
            searchedTodos = searchedTodos.filter(todo =>
                todo[`get${searchTodoKey.charAt(0).toUpperCase() + searchTodoKey.slice(1)}`]() === todoSearchObject[searchTodoKey]
            );
        })

        return searchedTodos;
    }

    public edit(todoId: uuidv4, updatedTodo: Partial<ITodo>): void {
        const todo: Todo = this.todos.find((todo: Todo) => todo.getId() === todoId);

        if (!todo) {
            throw new Error(`Todo with id ${todoId} not found`);
        }

        todo.update(updatedTodo);
    }

    public delete(todoId: uuidv4): void {
        this.todos = this.todos.filter((todo: Todo) => todo.getId() !== todoId);
    }

    public sort<TodoSortKey>(sortKey: TodoSortKey, direction: SortDirection): Todo[] {
        if (sortKey === 'status') {
            return this.todos.sort((todoA, todoB) => {
                const a = todoA.getStatus() === 'todo';
                const b = todoB.getStatus() === 'todo';

                return +b - +a;
            });
        }

        return this.todos.sort(
            (todoA, todoB) => {
                const a = todoA[`get${String(sortKey).charAt(0).toUpperCase() + String(sortKey).slice(1)}`]();
                const b = todoB[`get${String(sortKey).charAt(0).toUpperCase() + String(sortKey).slice(1)}`]();

                console.log('[a - b]', a - b, a, b);

                if (direction === 'desc') {
                    return a > b ? -1 : 1;
                }

                return b > a ? -1 : 1;
            }
        );
    }
}

const todoList = new TodoList();

const todo = new Todo('Create todo app');
const todo2 = new Todo('Create todo app');
const todo3 = new Todo('Create todo app');
const todo4 = new Todo('Create todo app 4');
const todoConfirmed = new TodoWithConfirmation('Confirm first todo');

todoList.add(todo);
todoList.add(todo2);
todoList.add(todo3);
todoList.add(todo4);
todoList.add(todoConfirmed);

todoList.edit(todo3.getId(), {title: 'TODO 3', description: 'Set todo3 description', status: 'done'})
todoList.edit(todo2.getId(), {title: 'TODO 2', description: 'Set todo2 description', status: 'done'})
todoList.edit(todoConfirmed.getId(), {title: 'Test todo', description: 'Confirmed test todo', status: 'done'})
console.log('[getTodo]', todoList.getTodo(todo2.getId()));
todoList.delete(todoConfirmed.getId());
console.log('[searched]', todoList.search({status: 'todo', title: 'Confirm first todo'}));
console.log('[list]', todoList.getList());
console.log('[sorted]', todoList.sort('status', 'asc'));
