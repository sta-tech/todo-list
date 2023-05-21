import { DateTime } from "luxon";
import { Button, Form } from "react-bootstrap";
import { FaTimes } from 'react-icons/fa';

import Todo from "../models/todo";
import classes from './TodoItem.module.css';
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setDone } from "../store/todo-list/slice";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const dueDate = DateTime.fromISO(todo.dueDate).toLocaleString(DateTime.DATE_SHORT);
  let rootClass = classes.todo;
  if (todo.done) {
    rootClass += ` ${classes.done}`;
  }
  const onDoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isDone = event.currentTarget.checked;
    dispatch(setDone(todo.id, isDone) as any);
  };
  const onRemoveClick = () => {
    dispatch(deleteTodo(todo.id) as any);
  };
  return (
    <div className={rootClass}>
      <div className={classes['todo-title']}>{todo.title}</div>
      <div className={classes['todo-date']}>{dueDate}</div>
      <div className={classes['todo-done']}>
        <Form.Check
          type="checkbox"
          label="Is done?"
          checked={todo.done}
          onChange={onDoneChange}
        />
      </div>
      <div>
        <Button size="sm" variant="danger" type="button" onClick={onRemoveClick}>
          <FaTimes />
        </Button>
      </div>
    </div>
  )
}

export default TodoItem;