import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { CartService } from '../../services/cart.service';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CustomCurrencyPipe
  ],
  template: `
    <div class="cart-container">
      <h1>Корзина покупок</h1>
      
      <div *ngIf="cartService.cartItems().length > 0; else emptyCart">
        <div class="cart-items">
          <mat-card *ngFor="let item of cartService.cartItems()" class="cart-item">
            <div class="item-content">
              <img [src]="item.product.image" [alt]="item.product.name" class="item-image">
              <div class="item-details">
                <h3>{{ item.product.name }}</h3>
                <p>{{ item.product.description | slice:0:100 }}...</p>
                <div class="item-price">{{ item.product.price | customCurrency }}</div>
              </div>
              <div class="item-actions">
                <button mat-icon-button (click)="updateQuantity(item.id, item.quantity - 1)">
                  <mat-icon>remove</mat-icon>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button mat-icon-button (click)="updateQuantity(item.id, item.quantity + 1)">
                  <mat-icon>add</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="removeItem(item.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </mat-card>
        </div>
        
        <mat-divider></mat-divider>
        
        <div class="cart-summary">
          <mat-card>
            <mat-card-content>
              <div class="summary-row">
                <span>Товаров в корзине:</span>
                <span>{{ cartService.totalItems() }}</span>
              </div>
              <div class="summary-row total">
                <span>Итого:</span>
                <span>{{ cartService.totalPrice() | customCurrency }}</span>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" (click)="checkout()">
                <mat-icon>shopping_cart_checkout</mat-icon>
                Оформить заказ
              </button>
              <button mat-stroked-button (click)="clearCart()">
                <mat-icon>clear_all</mat-icon>
                Очистить корзину
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
      
      <ng-template #emptyCart>
        <mat-card class="empty-cart">
          <mat-card-content>
            <mat-icon class="empty-icon">shopping_cart</mat-icon>
            <h2>Корзина пуста</h2>
            <p>Добавьте товары в корзину, чтобы продолжить покупки</p>
            <button mat-raised-button color="primary" routerLink="/products">
              <mat-icon>shopping_bag</mat-icon>
              Перейти к товарам
            </button>
          </mat-card-content>
        </mat-card>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .cart-item {
      margin-bottom: 16px;
    }
    .item-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }
    .item-details {
      flex: 1;
    }
    .item-details h3 {
      margin: 0 0 8px 0;
    }
    .item-details p {
      margin: 0 0 8px 0;
      color: rgba(0, 0, 0, 0.6);
    }
    .item-price {
      font-weight: bold;
      color: #1976d2;
    }
    .item-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .quantity {
      min-width: 30px;
      text-align: center;
    }
    .cart-summary {
      margin-top: 20px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .summary-row.total {
      font-weight: bold;
      font-size: 1.2em;
      border-top: 1px solid #eee;
      padding-top: 8px;
      margin-top: 16px;
    }
    .empty-cart {
      text-align: center;
      padding: 40px;
    }
    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: rgba(0, 0, 0, 0.3);
      margin-bottom: 16px;
    }
  `]
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    // Компонент инициализирован
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      this.cartService.updateQuantity(itemId, quantity).subscribe();
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe();
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe();
  }

  checkout(): void {
    // Имитация оформления заказа
    alert('Заказ оформлен! (Это демо)');
  }
}
