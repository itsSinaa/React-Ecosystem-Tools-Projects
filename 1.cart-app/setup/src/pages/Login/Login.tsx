import { Button, Container, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthType, loginSchema } from "../../types/types";
import { useLocalStroage } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = (data: AuthType) => {
    useLocalStroage("auth", {
      isLogin: true,
      userName: data.username,
      password: data.password,
    });

    navigate("/cart")
    reset();
  };

  return (
    <Container className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <TextField
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
          label="username"
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
          label="password"
          type="password"
        />
        <Button type="submit" variant="contained" className="w-fit p-1">
          Loing
        </Button>
      </form>
    </Container>
  );
};

export default Login;
