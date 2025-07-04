import { Category } from "./category.model";

export interface Income {
  subject: string;
  amount: string;
  date: string;
  category: Category;
}