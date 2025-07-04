import { Category } from "./category.model";

export interface Income {
  subject: string;
  amount: number;
  date: string;
  category: Category;
  mode: 'income';
}