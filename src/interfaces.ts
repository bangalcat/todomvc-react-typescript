type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoItemProps = {
  key: string;
  todo: Todo;
  editing?: boolean;
  onSave: (val: any) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onCancel: (event: any) => void;
  onToggle: () => void;
}

type TodoItemState = {
  editText: string;
};

type TodoFooterProps = {
  completedCount: number;
  onClearCompleted: any;
  nowShowing: string;
  count: number;
};

type TodoModel = {
  key: any;
  todos: Array<Todo>;
  onChanges: Array<any>;
  subscribe: (onChange: any) => void;
  inform: () => void;
  addTodo: (title: string) => void;
  toggleAll: (checked: boolean) => void;
  toggle: (todoToToggle: Todo) => void;
  destroy: (todo: Todo) => void;
  save: (todoToSave: Todo, text: string) => void;
  clearCompleted: () => void;
};

type AppProps = {
  model: TodoModel;
};

type AppState = {
  editing?: string | null;
  nowShoing?: string;
};

export {Todo, TodoItemProps, TodoItemState, TodoFooterProps ,TodoModel, AppProps, AppState};