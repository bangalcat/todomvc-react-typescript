import {Utils} from './Utils'
import {Todo, TodoModel} from './interfaces'

class TodoModelImpl implements TodoModel {

  key: any;  
  todos: Todo[];
  onChanges: any[];

  constructor(key : string) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
  }

  subscribe(onChange : any){
    this.onChanges.push(onChange);
  }
  inform(){
    Utils.store(this.key, this.todos);
    this.onChanges.forEach(cb => cb());
  }
  addTodo(title: string){
    this.todos = this.todos.concat({
      id:Utils.uuid(),
      title: title,
      completed: false
    });
    this.inform();
  }
  toggleAll(checked: boolean) {
    this.todos = this.todos.map<Todo>((todo : Todo) => {
      return Object.assign(todo, {completed: checked});
    });
    this.inform();
  }
  toggle(todoToToggle: Todo) {
    this.todos = this.todos.map<Todo>((todo : Todo) => {
      return todo !== todoToToggle ? todo : Object.assign(todo, {completed: !todo.completed});
    })
    this.inform();
  }
  destroy(todo: Todo) {
    this.todos = this.todos.filter((candidate) => candidate !== todo);
    this.inform();
  }
  save(todoToSave: Todo, text: string) {
    this.todos = this.todos.map(todo => todo !== todoToSave ? todo : Object.assign(todo, {title: text}));
    this.inform();
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.inform();
  }
}
export {TodoModelImpl};