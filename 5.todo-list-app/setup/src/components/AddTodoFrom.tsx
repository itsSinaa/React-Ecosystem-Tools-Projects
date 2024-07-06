import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDisptach } from "../hooks/hooks";
import { addTodo } from "../features/todoSlice";
import { todoSchema } from "./../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Forms = z.infer<typeof todoSchema>;

const AddTodoFrom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Forms>({
    resolver: zodResolver(todoSchema),
  });
  const dispatch = useAppDisptach();

  const onSubmit = (data: Forms) => {
    dispatch(
      addTodo({ id: crypto.randomUUID(), isComplete: false, title: data.todo })
    );

    reset();
  };

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"row"} gap={1}>
        <TextField
          error={!!errors.todo}
          helperText={errors.todo ? errors.todo.message : ""}
          {...register("todo")}
          sx={{ flexGrow: "1" }}
          label="todo"
        />
        <Button type="submit" variant="contained">
          Add Todo
        </Button>
      </Stack>
    </form>
  );
};

export default AddTodoFrom;
