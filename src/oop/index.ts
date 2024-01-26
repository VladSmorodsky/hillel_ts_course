import {Todo} from "./models/Todo";
import {TodoConfirm} from "./models/TodoConfirm";
import {TodoList} from "./TodoList";

const todoList = new TodoList();

const todo = new Todo('Create todo app');
const todo2 = new Todo('Create todo app');
const todo3 = new Todo('Create todo app');
const todo4 = new Todo('Create todo app 4');
const todoConfirmed = new TodoConfirm('Confirm first todo', '', () => false);

todoList.add(todo);
todoList.add(todo2);
todoList.add(todo3);
todoList.add(todo4);
todoList.add(todoConfirmed);

todoList.edit(todo3.getId(), {title: 'TODO 3', description: 'Set todo3 description', isCompleted: true})
todoList.edit(todo2.getId(), {title: 'TODO 2', description: 'Set todo2 description', isCompleted: true})
todoList.edit(todoConfirmed.getId(), {title: 'Test todo', description: 'Confirmed test todo', isCompleted: true})
console.log('[getTodo]', todoList.getTodoById(todo2.getId()));

todoList.delete(todoConfirmed.getId());
console.log('[searched]', todoList.search('Set'));
console.log('[list]', todoList.getList());
console.log('[sorted]', todoList.sort('isCompleted', 'desc'));