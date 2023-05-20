import { useState } from 'react';
import classes from './AddTodoForm.module.css';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import todoListSlice from '../store/todo-list/slice';
import Todo from '../models/todo';

function AddTodoForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  }
  const onTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length > 0) {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title: title,
        owner: 'statech',
        dueDate: new Date().toISOString(),
        done: false,
      };
      dispatch(todoListSlice.actions.addTodo(todo));
      setTitle('');
    }
  }
  return (
    <Form className={classes['add-todo-form']} onSubmit={onTodoSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={onTitleChange}
        />
      </Form.Group>
      <Button type='submit'>Save</Button>
    </Form>
  );
}

export default AddTodoForm;