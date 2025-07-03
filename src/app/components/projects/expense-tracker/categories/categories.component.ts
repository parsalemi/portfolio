import { Component, computed, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TooltipDirective } from 'src/app/shared/directives/tooltip.directive';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [MessageService],
  imports: [
    FormsModule,
    MatIconModule,
    ToastModule
  ],
})
export class CategoriesComponent {
  constructor(private _message: MessageService) {}
  private _ctgsService = inject(CategoryService);
  categories = computed( () => this._ctgsService.categories());
  iconOptions = [
    'shopping_cart', 'add_shopping_cart', 'shopping_bag', 
    'shop', 'card_giftcard', 'attach_money', 
    'home', 'local_hospital', 'account_balance',
    'restaurant', 'fastfood', 'cake', 
    'directions_car', 'commute', 'motorcycle', 
    'flight', 'build', 'settings', 
    'sports_esports', 'gamepad', 'fitness_center', 
    'school', 'code', 'spa', 
    'person', 'account_circle', 'favorite', 
    'assignment', 'book', 'calendar_today', 
    'account_balance_wallet', 'card_travel', 'event', 
    'credit_card', 'palette', 'explore', 
    'location_on', 'wifi', 'tv', 
    'security', 'delete_outline', 'grade', 
    'trending_down', 'trending_up', 'compare_arrows',
  ]

  newCategory = {
    name: '',
    icon: 'shopping_cart'
  }
  addCategory() {
    if(this.newCategory.name.trim()){
      const toAdd = this._ctgsService.addCategory(this.newCategory);
      this._ctgsService.addCategory(this.newCategory);
      if(toAdd){
        this._message.add({severity: 'success', summary: 'Sucessful', detail: 'Category Added', life: 1000});
        this.newCategory = {
          name: '',
          icon: 'shopping_cart'
        };
      }
      else {
        this._message.add({severity: 'error', summary: 'Category Allready Exists', detail: 'Change The Category Name', life: 3000})
      }
    }
  }
  deleteCategory(id: number){
    const confirmamtion = confirm('Do you want to delete this category?');
    if(confirmamtion) this._ctgsService.deleteCategory(id);
  }
  handleIcon(icon: string){
    this.newCategory.icon = icon;
  }
}
