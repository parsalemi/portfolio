export interface Order {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}

export interface Cart {
  order: string;
  purchased: boolean;
}

export interface CartDTO {
  order: string;
  purchased: number;
}