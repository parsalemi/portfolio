import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { 
    this.loadUserCtgs();
  }

  defalutCtgs: Category[] = [
    {id: 1, name: 'Home', icon: 'home', isDefault: true},
    {id: 2, name: 'Shopping', icon: 'shopping_cart', isDefault: true},
    {id: 3, name: 'Repairs', icon: 'build', isDefault: true},
    {id: 4, name: 'Bills', icon: 'credit_card', isDefault: true},
    {id: 5, name: 'Food', icon: 'restaurant', isDefault: true},
    {id: 6, name: 'Gift', icon: 'card_giftcard', isDefault: true},
    {id: 7, name: 'Transportaion', icon: 'commute', isDefault: true},
    {id: 8, name: 'Trip', icon: 'explore', isDefault: true},
    {id: 9, name: 'Internet', icon: 'wifi', isDefault: true},
    {id: 10, name: 'Games', icon: 'gamepad', isDefault: true},
    {id: 11, name: 'Personal', icon: 'person', isDefault: true},
    {id: 12, name: 'Education', icon: 'school', isDefault: true},
    {id: 13, name: 'health', icon: 'local_hospital', isDefault: true}
  ];

  categories = signal<Category[]>([]);

  private loadUserCtgs() {
    const savedCtgs = localStorage.getItem('userCategories');
    if(savedCtgs) {
      const userCtgs = JSON.parse(savedCtgs);
      const allCtgs = [...userCtgs, ...this.defalutCtgs];
      this.categories.set(allCtgs)
    }
    else {
      this.categories.set(this.defalutCtgs);
    }
  }

  addCategory(newCategory: Omit<Category, 'id' | 'isDefault'>) {
    const currentCtgs = this.categories();
    if(!currentCtgs.some(c => c.name.toLowerCase() === newCategory.name.toLowerCase())) {
      const categoryToAdd: Category = {
        ...newCategory,
        id: this.categories().length + 1,
        isDefault: false
      };
      this.categories.update(ctgs => [...ctgs, categoryToAdd]);
      const userAddedCtgs = this.categories().filter(c => !c.isDefault);
      localStorage.setItem('userCategories', JSON.stringify(userAddedCtgs));
      return true;
    }
    else {
      return false;
    }
  }

  getCategoryById(id: number): Category | undefined{
    return this.categories().find(c => c.id === id);
  }

}
