export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
