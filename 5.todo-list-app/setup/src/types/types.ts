import { z } from "zod";
import { patterns } from "../constance ";

export const todoSchema = z.object({
  todo: z
    .string()
    .min(1, { message: "Please define the todo title before submitting" })
    .regex(/^(?!\s*$).+/, {
      message: "Todo cannot be empty or just whitespace",
    }),
});
