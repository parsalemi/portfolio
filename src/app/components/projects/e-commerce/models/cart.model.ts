export interface Order {
  productId: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
}

export interface Cart {
  order: string;
  purchased: boolean;
}

export interface CartDTO {
  order: string;
  purchased: number;
}