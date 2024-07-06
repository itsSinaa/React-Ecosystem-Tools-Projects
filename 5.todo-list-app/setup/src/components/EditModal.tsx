import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDisptach, useAppSelector } from "../hooks/hooks";
import { closeEditModal, editTodo } from "../features/todoSlice";

type FormValues = {
  title: string;
};

type TodoInfo = {
  todoId: string;
  status: boolean;
};

const EditTodoModal = ({ todoId, status }: TodoInfo) => {
  const selectedTodo = useAppSelector((state) =>
    state.todos.Todos.find((todo) => todo.id === todoId)
  );

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: selectedTodo?.title || "",
    },
  });
  const disptach = useAppDisptach();
  const onSubmit = (data: FormValues) => {
    disptach(editTodo({ id: todoId, title: data.title, isComplete: status }));
    disptach(closeEditModal());
    reset();
  };

  return (
    <Dialog open>
      <DialogTitle>Edit Todo</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register("title")}
            fullWidth
            margin="dense"
            label="title"
            focused
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => disptach(closeEditModal())}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTodoModal;
