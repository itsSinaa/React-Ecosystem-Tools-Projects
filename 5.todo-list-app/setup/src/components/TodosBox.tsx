  import React, { useState } from "react";
  import {
    Card,
    CardContent,
    Checkbox,
    Typography,
    IconButton,
    Stack,
  } from "@mui/material";
  import { Todo } from "./../features/todoSlice";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";

  import { removeTodo, openEditModal, toggleTodo } from "./../features/todoSlice";
  import { useAppDisptach, useAppSelector } from "../hooks/hooks";
  import EditTodoModal from "./EditModal";

  const TodosBox = ({ id, title, isComplete }: Todo) => {
    const disptach = useAppDisptach();
    const {isEditing,currentTodoId} = useAppSelector((state) => state.todos);

    return (
      <>
        <Card sx={{ mb: 2 }}>
          <CardContent style={{ padding: ".25rem" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <Checkbox
                  onChange={() => disptach(toggleTodo({ id, title, isComplete }))}
                  checked={isComplete}
                />
                <Typography
                  variant="body1"
                  sx={{ textDecoration: isComplete ? "line-through" : "none" }}>
                  {title}
                </Typography>
              </Stack>
              <Stack gap={1} direction={"row"}>
                <IconButton
                  onClick={() => disptach(removeTodo(id))}
                  aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => disptach(openEditModal(id))}
                  aria-label="delete">
                  <EditIcon />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {isEditing && currentTodoId === id && (
          <EditTodoModal status={isComplete} todoId={id} />
        )}
      </>
    );
  };

  export default TodosBox;
