import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CustomCurrencyPipe
  ],
  template: `
    <div class="product-detail-container" *ngIf="product">
      <mat-card class="product-card">
        <div class="product-image">
          <img [src]="product.image" [alt]="product.name">
        </div>
        <mat-card-content>
          <h1>{{ product.name }}</h1>
          <p>{{ product.description }}</p>
          <div class="product-price">
            <span class="price">{{ product.price | customCurrency }}</span>
          </div>
          <div class="product-rating">
            <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                      [class.filled]="star <= product.rating">
              star
            </mat-icon>
            <span>{{ product.rating }} ({{ product.reviews }} отзывов)</span>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="addToCart()">
            <mat-icon>add_shopping_cart</mat-icon>
            Добавить в корзину
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    <div *ngIf="!product" class="loading">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    .product-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
    .product-price .price {
      font-size: 24px;
      font-weight: bold;
      color: #1976d2;
    }
    .product-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin: 16px 0;
    }
    .product-rating mat-icon.filled {
      color: #ffc107;
    }
    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(+id).subscribe(product => {
        this.product = product;
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, 1).subscribe();
    }
  }
}
