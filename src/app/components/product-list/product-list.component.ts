import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-list">
      <h2>Каталог товаров</h2>
      
      @if (productService.isLoading()) {
        <div class="loading">Загрузка товаров...</div>
      } @else {
        <div class="products-grid">
          @for (product of productService.products(); track product.id) {
            <div class="product-card">
              <img [src]="product.image" [alt]="product.name" class="product-image">
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-details">
                  <span class="price">{{ product.price | currency:'RUB':'symbol':'1.0-0':'ru' }}</span>
                  <div class="rating">
                    <span class="stars">★ {{ product.rating }}</span>
                    <span class="reviews">({{ product.reviews }} отзывов)</span>
                  </div>
                </div>
                <div class="product-actions">
                  <a [routerLink]="['/products', product.id]" class="btn btn-outline">
                    Подробнее
                  </a>
                  <button 
                    class="btn btn-primary"
                    (click)="addToCart(product)"
                    [disabled]="!product.inStock || cartService.isLoading()">
                    @if (cartService.isLoading()) {
                      Добавление...
                    } @else {
                      В корзину
                    }
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .product-list {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .loading {
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #666;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-info {
      padding: 16px;
    }

    .product-info h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      color: #333;
    }

    .product-description {
      color: #666;
      font-size: 14px;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }

    .product-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
      color: #2c5aa0;
    }

    .rating {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 12px;
    }

    .stars {
      color: #ffa500;
      font-weight: bold;
    }

    .reviews {
      color: #666;
    }

    .product-actions {
      display: flex;
      gap: 8px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .btn-primary {
      background-color: #2c5aa0;
      color: white;
      flex: 1;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #1e3f73;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-outline {
      background-color: transparent;
      color: #2c5aa0;
      border: 1px solid #2c5aa0;
    }

    .btn-outline:hover {
      background-color: #2c5aa0;
      color: white;
    }
  `]
})
export class ProductListComponent implements OnInit {
  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1).subscribe();
  }
}
