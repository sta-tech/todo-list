import { useState } from 'react';
import classes from './AddTodoForm.module.css';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createTodo } from '../store/todo-list/slice';

function AddTodoForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  }
  const onTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length > 0) {
      dispatch(createTodo(title, "statech", new Date(), false) as any);
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