import { z } from "zod";
import axios from "axios";

const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  time: z.number(),
  description: z.string(),
  vegan: z.boolean(),
});

export type Recipe = z.infer<typeof recipeSchema>;

export const fetchData = async () => {
  const res = await axios.get("http://localhost:4000/recipes");
  const rawData = recipeSchema.array().safeParse(res.data);

  if (!rawData.success) {
    throw new Error("falid to parse the data");
  }

  return rawData.data;
};
