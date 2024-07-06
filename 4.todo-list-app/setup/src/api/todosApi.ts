import axios from "axios";

export interface Todos {
  checked: boolean;
  title: string;
  description: string;
  id: string;
}

const axiosInstance = axios.create({ baseURL: "http://localhost:4000/" });

export const getTodos = async (): Promise<Todos[]> => {
  const res = await axiosInstance.get<Todos[]>("/todos");

  return res.data;
};

export const addTodo = async (todo: Todos): Promise<Todos> => {
  const res = await axiosInstance.post("/todos", todo);

  return res.data;
};

export const updateTodo = async (todo: Todos): Promise<Todos> => {
  const res = await axiosInstance.patch(`/todos/${todo.id}`, todo);

  return res.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/todos/${id}`);
};
