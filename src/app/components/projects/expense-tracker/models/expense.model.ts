import { Category } from "./category.model";

export interface Expense{
  subject: string;
  amount: number;
  description?: string;
  date: string;
  category: Category
  mode: 'expense';
}