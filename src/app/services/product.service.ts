import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap, map } from 'rxjs';
import { Product, ProductFilter, ProductSort } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Signals для state management
  private readonly _products = signal<Product[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _filter = signal<ProductFilter>({});
  private readonly _sort = signal<ProductSort>({ field: 'name', direction: 'asc' });
  
  // Computed signals
  readonly products = computed(() => this._products());
  readonly isLoading = computed(() => this._isLoading());
  readonly filteredProducts = computed(() => {
    const products = this._products();
    const filter = this._filter();
    const sort = this._sort();
    
    let filtered = this.applyFilter(products, filter);
    return this.applySort(filtered, sort);
  });
  
  // BehaviorSubject для совместимости с RxJS
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  public readonly products$ = this.productsSubject.asObservable();

  constructor() {
    this.initializeMockProducts();
  }

  private initializeMockProducts(): void {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        description: 'Новейший смартфон от Apple с титановым корпусом и чипом A17 Pro',
        price: 99999,
        image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?text=iPhone+15+Pro',
        category: 'electronics',
        inStock: true,
        rating: 4.8,
        reviews: 1250,
        specifications: [
          { name: 'Экран', value: '6.1', unit: 'дюймов' },
          { name: 'Память', value: '128', unit: 'ГБ' },
          { name: 'Камера', value: '48', unit: 'МП' }
        ],
        tags: ['apple', 'smartphone', 'premium'],
        createdAt: new Date('2023-09-15')
      },
      {
        id: 2,
        name: 'MacBook Pro M3',
        description: 'Мощный ноутбук для профессионалов с чипом M3',
        price: 199999,
        image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=MacBook+Pro',
        category: 'electronics',
        inStock: true,
        rating: 4.9,
        reviews: 890,
        specifications: [
          { name: 'Экран', value: '14', unit: 'дюймов' },
          { name: 'Память', value: '16', unit: 'ГБ' },
          { name: 'SSD', value: '512', unit: 'ГБ' }
        ],
        tags: ['apple', 'laptop', 'professional'],
        createdAt: new Date('2023-10-30')
      },
      {
        id: 3,
        name: 'Samsung Galaxy S24',
        description: 'Флагманский Android смартфон с ИИ функциями',
        price: 89999,
        image: 'https://via.placeholder.com/300x200/1F1F1F/FFFFFF?text=Galaxy+S24',
        category: 'electronics',
        inStock: true,
        rating: 4.7,
        reviews: 2100,
        specifications: [
          { name: 'Экран', value: '6.2', unit: 'дюймов' },
          { name: 'Память', value: '256', unit: 'ГБ' },
          { name: 'Камера', value: '50', unit: 'МП' }
        ],
        tags: ['samsung', 'android', 'flagship'],
        createdAt: new Date('2024-01-17')
      },
      {
        id: 4,
        name: 'Nike Air Max 270',
        description: 'Спортивные кроссовки с максимальной амортизацией',
        price: 12999,
        image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Nike+Air+Max',
        category: 'clothing',
        inStock: true,
        rating: 4.5,
        reviews: 3400,
        specifications: [
          { name: 'Размеры', value: '36-46', unit: 'EU' },
          { name: 'Материал', value: 'Текстиль/Кожа' },
          { name: 'Вес', value: '320', unit: 'г' }
        ],
        tags: ['nike', 'sneakers', 'sport'],
        createdAt: new Date('2023-08-20')
      },
      {
        id: 5,
        name: 'Sony WH-1000XM5',
        description: 'Беспроводные наушники с активным шумоподавлением',
        price: 24999,
        image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Sony+WH-1000XM5',
        category: 'electronics',
        inStock: false,
        rating: 4.6,
        reviews: 1800,
        specifications: [
          { name: 'Тип', value: 'Накладные' },
          { name: 'Bluetooth', value: '5.2' },
          { name: 'Время работы', value: '30', unit: 'часов' }
        ],
        tags: ['sony', 'headphones', 'noise-cancelling'],
        createdAt: new Date('2023-05-12')
      },
      {
        id: 6,
        name: 'JavaScript: The Definitive Guide',
        description: 'Полное руководство по JavaScript от Дэвида Фланагана',
        price: 2999,
        image: 'https://via.placeholder.com/300x200/FFD700/000000?text=JavaScript+Guide',
        category: 'books',
        inStock: true,
        rating: 4.8,
        reviews: 560,
        specifications: [
          { name: 'Страниц', value: '1096' },
          { name: 'Язык', value: 'Русский' },
          { name: 'Издательство', value: 'O\'Reilly' }
        ],
        tags: ['javascript', 'programming', 'reference'],
        createdAt: new Date('2023-03-15')
      }
    ];
    
    this._products.set(mockProducts);
    this.productsSubject.next(mockProducts);
  }

  // Получение всех товаров
  getProducts(): Observable<Product[]> {
    this._isLoading.set(true);
    
    return of(this._products()).pipe(
      delay(500),
      tap(() => this._isLoading.set(false))
    );
  }

  // Получение товара по ID
  getProduct(id: number): Observable<Product | undefined> {
    this._isLoading.set(true);
    
    const product = this._products().find(p => p.id === id);
    
    return of(product).pipe(
      delay(300),
      tap(() => this._isLoading.set(false))
    );
  }

  // Поиск товаров
  searchProducts(query: string): Observable<Product[]> {
    this._isLoading.set(true);
    
    const filtered = this._products().filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    return of(filtered).pipe(
      delay(400),
      tap(() => this._isLoading.set(false))
    );
  }

  // Применение фильтров
  setFilter(filter: ProductFilter): void {
    this._filter.set(filter);
  }

  // Применение сортировки
  setSort(sort: ProductSort): void {
    this._sort.set(sort);
  }

  // Приватные методы для фильтрации и сортировки
  private applyFilter(products: Product[], filter: ProductFilter): Product[] {
    return products.filter(product => {
      if (filter.category && product.category !== filter.category) return false;
      if (filter.minPrice && product.price < filter.minPrice) return false;
      if (filter.maxPrice && product.price > filter.maxPrice) return false;
      if (filter.inStock !== undefined && product.inStock !== filter.inStock) return false;
      if (filter.minRating && product.rating < filter.minRating) return false;
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesDescription = product.description.toLowerCase().includes(searchLower);
        const matchesTags = product.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesName && !matchesDescription && !matchesTags) return false;
      }
      return true;
    });
  }

  private applySort(products: Product[], sort: ProductSort): Product[] {
    return [...products].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sort.field) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'createdAt':
          aValue = a.createdAt?.getTime() || 0;
          bValue = b.createdAt?.getTime() || 0;
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Получение категорий
  getCategories(): string[] {
    const categories = new Set(this._products().map(p => p.category));
    return Array.from(categories);
  }

  // Получение рекомендуемых товаров
  getRecommendedProducts(productId: number, limit: number = 4): Observable<Product[]> {
    const product = this._products().find(p => p.id === productId);
    if (!product) return of([]);
    
    const recommended = this._products()
      .filter(p => p.id !== productId && p.category === product.category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return of(recommended).pipe(delay(300));
  }
}
