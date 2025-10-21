import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CustomCurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Signals для демонстрации
  private readonly _featuredProducts = signal<any[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _stats = signal({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0
  });
  
  readonly featuredProducts = computed(() => this._featuredProducts());
  readonly isLoading = computed(() => this._isLoading());
  readonly stats = computed(() => this._stats());

  constructor(
    public productService: ProductService,
    public userService: UserService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadStats();
  }

  private loadFeaturedProducts(): void {
    this._isLoading.set(true);
    
    this.productService.getProducts().subscribe(products => {
      // Берем первые 6 товаров как рекомендуемые
      const featured = products.slice(0, 6);
      this._featuredProducts.set(featured);
      this._isLoading.set(false);
    });
  }

  private loadStats(): void {
    // Имитация загрузки статистики
    setTimeout(() => {
      this._stats.set({
        totalProducts: 150,
        totalUsers: 1250,
        totalOrders: 3400
      });
    }, 1000);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product, 1).subscribe();
  }

  isInCart(productId: number): boolean {
    return this.cartService.isInCart(productId);
  }
}
