import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./todo-list/slice";

const store = configureStore({
  reducer: {
    todoListState: todoListSlice.reducer,
  },
});

export default store;