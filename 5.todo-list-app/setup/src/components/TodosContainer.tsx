import React from "react";
import { Stack } from "@mui/material";
import { InitialType } from "./../features/todoSlice";
import { useAppSelector } from "../hooks/hooks";
import TodosBox from "./TodosBox";

export const TodosContainer = () => {
  const todos = useAppSelector((state) => state.todos.Todos);

  return (
    <Stack>
      {todos?.map((todo) => {
        return <TodosBox {...todo} key={todo.id} />;
      })}
    </Stack>
  );
};
