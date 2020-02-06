import React from 'react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import { Utils } from '../Utils';
import { TodoFooterProps } from '../interfaces';
import { Link } from 'react-router-dom';

class TodoFooter extends React.Component<TodoFooterProps, {}> {
  render() {
    const activeTodoWord = Utils.pluralize(this.props.count, 'item');
    let clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button className="clear-completed" onClick={this.props.onClearCompleted}>
          Clear Completed
        </button>
      );
    }
    const nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <Link to="/" className={`selected-${nowShowing === ACTIVE_TODOS}`}>
              All
            </Link>
          </li>
          <li>
            <Link to="/active" className={`selected-${nowShowing === ACTIVE_TODOS}`}>
              Active
            </Link>
          </li>{' '}
          <li>
            <Link to="/completed" className={`selected-${nowShowing === COMPLETED_TODOS}`}>
              Completed
            </Link>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
}

export { TodoFooter };
