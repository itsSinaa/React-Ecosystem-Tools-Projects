export type Product = {
  id: string;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  rating: Rating;
};

type Rating = {
  rate: number;
  count: number;
};
