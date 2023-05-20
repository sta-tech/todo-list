import { useSelector } from "react-redux";
import AppState from "../store/app-state";
import classes from './TodoList.module.css';
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useSelector((state: AppState) => state.todoListState.todos);

  const todosContent = todos.length > 0
    ? todos.map(t => <li key={t.id}><TodoItem todo={t} /></li>)
    : <div>No data</div>;

  return (
    <ul className={classes['todo-list']}>{todosContent}</ul>
  );
}

export default TodoList;