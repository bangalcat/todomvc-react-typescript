import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from './constants';
import { TodoItem } from './component/TodoItem'
import { TodoFooter } from './component/TodoFooter'
import { TodoModelImpl } from './TodoModel'
import { Todo, AppProps, AppState } from './interfaces';

class App extends Component<AppProps, AppState> {
  state = {
    nowShowing: ALL_TODOS,
    editing: null,
  };

  handleNewTodoKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();

    let val = (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement).value.trim();

    if (val) {
      this.props.model.addTodo(val);
      (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement).value = '';
    }
  }

  toggleAll(event: React.FormEvent) {
    const target: any = event.target;
    const checked = target.checked;
    this.props.model.toggleAll(checked);
  }

  toggle(todoToToggle: Todo) {
    this.props.model.toggle(todoToToggle);
  }

  destroy(todo: Todo) {
    this.props.model.destroy(todo);
  }

  edit(todo: Todo) {
    this.setState({ editing: todo.id });
  }

  save(todoToSave: Todo, text: string) {
    this.props.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  cancel() {
    this.setState({ editing: null });
  }

  clearCompleted() {
    this.props.model.clearCompleted();
  }

  render() {
    let footer;
    let main;
    const todos = this.props.model.todos;

    const shownTodos = todos.filter(todo => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    const todoItems = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={() => this.cancel()}
        />
      );
    });

    const activeTodoCount = todos.reduce((accum, todo) => (todo.completed ? accum : accum + 1), 0);
    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={() => this.clearCompleted()}
        />
      );
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={e => this.toggleAll(e)}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all">Mark all as completed</label>
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              ref="newField"
              className="new-todo"
              placeholder="what needs to be done?"
              onKeyDown={e => this.handleNewTodoKeyDown(e)}
              autoFocus={true}
            />
          </header>
          {main}
          {footer}
        </div>
        <Switch>
          <Route path="/">
            {this.setState.bind(this, {nowShoing: ALL_TODOS})}
          </Route>
          <Route path="/active">
            {this.setState.bind(this, {nowShoing: ACTIVE_TODOS})}
          </Route>
          <Route path="/completed">
            {this.setState.bind(this, {nowShoing: COMPLETED_TODOS})}
          </Route>
        </Switch>
      </Router>
    );
  }
}

const model = new TodoModelImpl('react-todos');

function render() {
  ReactDOM.render(<App model={model} />, document.getElementById('root'));
}
model.subscribe(render);
render();