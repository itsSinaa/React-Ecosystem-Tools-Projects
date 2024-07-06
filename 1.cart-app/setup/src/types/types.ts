import { z } from "zod";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export const loginSchema = z.object({
  username: z.string()
    .min(1, { message: "Please fill the username field" })
    .regex(/^\S+$/, { message: "Username should not contain spaces" }),
  password: z.string()
    .min(1, { message: "Please fill the password field" })
    .regex(/^\S+$/, { message: "Password should not contain spaces" }),
});

export type AuthType = z.infer<typeof loginSchema>;