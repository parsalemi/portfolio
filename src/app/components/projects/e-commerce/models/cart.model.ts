export interface Order {
  productId: number;
  name: string;
  price: number;
  code: string;
  weight: number;
  quantity: number;
}

export interface Cart {
  order: Order[];
  purchased: boolean;
}

export interface CartDTO {
  order: Order[];
  purchased: number;
}

export interface OrderHistory{
  order: Order[];
  id: number;
  date: string;
}