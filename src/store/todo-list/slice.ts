import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import TodoListState from "./todo-list-state";
import Todo from "../../models/todo";
import httpService from "../../services/http-service";
import TodoCreateRequest from "../../models/todo-create-request";

const initialState: TodoListState = {
  todos: [],
};

const todoListSlice = createSlice({
  name: 'todoListState',
  initialState: initialState,
  reducers: {
    setData(state, { payload }) {
      const items: Todo[] = payload;
      state.todos = items;
    },
    addTodo(state, { payload }) {
      const item: Todo = payload;
      state.todos = [item,...state.todos];
    },
    removeItem(state, { payload }) {
      const itemId: string = payload;
      state.todos = state.todos.filter(x => x.id !== itemId);
    },
    setDone(state, { payload }) {
      const itemId: string = payload.id;
      const done: boolean = payload.done;
      const item = state.todos.find(x => x.id === itemId);
      if (item) {
        item.done = done;
      }
    }
  }
});

export function fetchTodos() {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const data = await httpService.getAll();
      if (data.items.length > 0) {
        dispatch(todoListSlice.actions.setData(data.items));
      }
    }
    catch(error) {
      console.error(error);
    }
  };
}

export function createTodo(title: string, owner: string, dueDate: Date, done: boolean) {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const request: TodoCreateRequest = {
        title: title,
        owner: owner,
        dueDate: dueDate.toISOString(),
        done: done,
      };
      const item = await httpService.add(request);
      if(item) {
        dispatch(todoListSlice.actions.addTodo(item));
      }
    }
    catch(error) {
      console.error(error);
    }
  };
}

export function setDone(id: string, done: boolean) {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await httpService.updateDone(id, done);
      dispatch(todoListSlice.actions.setDone({
        id: id,
        done: done,
      }));
    }
    catch(error) {
      console.error(error);
    }
  };
}

export function deleteTodo(id: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await httpService.delete(id);
      dispatch(todoListSlice.actions.removeItem(id));
    }
    catch(error) {
      console.error(error);
    }
  }
}

export default todoListSlice;