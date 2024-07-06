import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  isComplete: boolean;
};

type InitialState = {
  Todos: Todo[];
  isEditing: boolean;
  currentTodoId: string | null;
};

const initialState: InitialState = {
  isEditing: false,
  Todos: [],
  currentTodoId: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.Todos.push(action.payload);
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.Todos = state.Todos.filter(
        (todo: Todo) => todo.id !== action.payload
      );
    },

    editTodo: (state, action: PayloadAction<Todo>) => {
      state.Todos = state.Todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
          return todo;
        }
        return todo;
      });
      state.isEditing = false;
      state.currentTodoId = null;
    },

    toggleTodo: (state, action: PayloadAction<Todo>) => {
      state.Todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.isComplete = !action.payload.isComplete;
        }

        return todo;
      });
    },

    openEditModal: (state, action: PayloadAction<string>) => {
      state.isEditing = true;
      state.currentTodoId = action.payload;
    },

    closeEditModal: (state) => {
      state.isEditing = false;
      state.currentTodoId = null;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  openEditModal,
  closeEditModal,
  editTodo,
  toggleTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
