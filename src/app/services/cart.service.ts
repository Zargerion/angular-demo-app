import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Демонстрация signals для state management
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _isLoading = signal(false);
  
  // Computed signals для вычисляемых значений
  readonly cartItems = computed(() => this._cartItems());
  readonly totalItems = computed(() => 
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly totalPrice = computed(() => 
    this._cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );
  readonly isEmpty = computed(() => this._cartItems().length === 0);
  readonly isLoading = computed(() => this._isLoading());
  
  // BehaviorSubject для совместимости с RxJS
  private readonly cartSubject = new BehaviorSubject<CartItem[]>([]);
  public readonly cart$ = this.cartSubject.asObservable();

  constructor() {
    // Инициализация с моковыми данными
    this.initializeMockCart();
  }

  private initializeMockCart(): void {
    const mockItems: CartItem[] = [
      {
        id: 1,
        product: {
          id: 1,
          name: 'iPhone 15 Pro',
          description: 'Новейший смартфон от Apple',
          price: 99999,
          image: 'https://via.placeholder.com/300x200',
          category: 'electronics',
          inStock: true,
          rating: 4.8,
          reviews: 1250
        },
        quantity: 1,
        addedAt: new Date()
      },
      {
        id: 2,
        product: {
          id: 2,
          name: 'MacBook Pro M3',
          description: 'Мощный ноутбук для профессионалов',
          price: 199999,
          image: 'https://via.placeholder.com/300x200',
          category: 'electronics',
          inStock: true,
          rating: 4.9,
          reviews: 890
        },
        quantity: 1,
        addedAt: new Date()
      }
    ];
    
    this._cartItems.set(mockItems);
    this.cartSubject.next(mockItems);
  }

  // Добавление товара в корзину
  addToCart(product: Product, quantity: number = 1): Observable<CartItem> {
    this._isLoading.set(true);
    
    const existingItem = this._cartItems().find(item => item.product.id === product.id);
    
    let updatedItems: CartItem[];
    let addedItem: CartItem;
    
    if (existingItem) {
      // Увеличиваем количество существующего товара
      updatedItems = this._cartItems().map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      addedItem = updatedItems.find(item => item.product.id === product.id)!;
    } else {
      // Добавляем новый товар
      const newItem: CartItem = {
        id: Date.now(), // Простой ID генератор
        product,
        quantity,
        addedAt: new Date()
      };
      updatedItems = [...this._cartItems(), newItem];
      addedItem = newItem;
    }
    
    return of(addedItem).pipe(
      delay(300), // Имитация HTTP запроса
      tap(() => {
        this._cartItems.set(updatedItems);
        this.cartSubject.next(updatedItems);
        this._isLoading.set(false);
      })
    );
  }

  // Удаление товара из корзины
  removeFromCart(itemId: number): Observable<void> {
    this._isLoading.set(true);
    
    const updatedItems = this._cartItems().filter(item => item.id !== itemId);
    
    return of(undefined).pipe(
      delay(200),
      tap(() => {
        this._cartItems.set(updatedItems);
        this.cartSubject.next(updatedItems);
        this._isLoading.set(false);
      })
    );
  }

  // Обновление количества товара
  updateQuantity(itemId: number, quantity: number): Observable<CartItem[]> {
    this._isLoading.set(true);
    
    if (quantity <= 0) {
      const updatedItems = this._cartItems().filter(item => item.id !== itemId);
      return of(updatedItems).pipe(
        delay(200),
        tap(items => {
          this._cartItems.set(items);
          this.cartSubject.next(items);
          this._isLoading.set(false);
        })
      );
    }
    
    const updatedItems = this._cartItems().map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    return of(updatedItems).pipe(
      delay(200),
      tap(items => {
        this._cartItems.set(items);
        this.cartSubject.next(items);
        this._isLoading.set(false);
      })
    );
  }

  // Очистка корзины
  clearCart(): Observable<void> {
    this._isLoading.set(true);
    
    return of(undefined).pipe(
      delay(300),
      tap(() => {
        this._cartItems.set([]);
        this.cartSubject.next([]);
        this._isLoading.set(false);
      })
    );
  }

  // Получение товара по ID
  getCartItem(itemId: number): CartItem | undefined {
    return this._cartItems().find(item => item.id === itemId);
  }

  // Проверка наличия товара в корзине
  isInCart(productId: number): boolean {
    return this._cartItems().some(item => item.product.id === productId);
  }

  // Получение количества конкретного товара
  getProductQuantity(productId: number): number {
    const item = this._cartItems().find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
}
