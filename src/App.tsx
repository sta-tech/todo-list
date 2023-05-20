import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './store/todo-list/slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;

      dispatch(fetchTodos() as any);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <main className='main-container'>
        <AddTodoForm />
        <TodoList/>
      </main>
    </React.Fragment>
  );
}

export default App;
