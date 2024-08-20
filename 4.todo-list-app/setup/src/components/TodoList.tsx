import React, { FormEventHandler, useState } from "react";

import { addTodo, deleteTodo, getTodos, updateTodo } from "./../api/todosApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Todos } from "./../api/todosApi";

const TodoList = () => {
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const createTodos = useMutation({
    mutationFn: addTodo,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodos = useMutation({
    mutationFn: updateTodo,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodos = useMutation({
    mutationFn: deleteTodo,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <i>...Loading</i>;
  }

  if (isError) {
    return <i>{error.message}</i>;
  }

  const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodos.mutate({
      checked: false,
      description: "test",
      id: String(todos?.length as number + 1),
      title: title,
    });

    setTitle("");
  };

  return (
    <>
      <form onSubmit={handleCreateTodo}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="new-todo"
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
      </form>
      {todos?.map((todo: Todos) => {
        return (
          <article key={todo.id}>
            <div className="todo">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={(e) =>
                  updateTodos.mutate({ ...todo, checked: !todo.checked })
                }
              />
              <label>{todo.title}</label>
            </div>
            <button
              onClick={(e) => {
                deleteTodos.mutate(todo.id);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </article>
        );
      })}
    </>
  );
};

export default TodoList;
