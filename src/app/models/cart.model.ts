interface Cart {
  id: number;
  userId: number;
  date: string;
  products: ProductCart[];
}

interface ProductCart {
  productId: number;
  quantity: number;
}
