# Angular Demo App

Комплексное тестовое приложение на Angular, демонстрирующее максимум возможностей фреймворка.

## 🚀 Возможности приложения

### Компоненты
- **Standalone компоненты** с lifecycle hooks (OnInit, OnDestroy)
- **Inputs/Outputs** для взаимодействия между компонентами
- **View Encapsulation** с изолированными стилями
- **Content Projection** и структурные директивы

### Сервисы и Dependency Injection
- **UserService** - управление пользователями с signals и RxJS
- **ProductService** - каталог товаров с фильтрацией и сортировкой
- **CartService** - корзина покупок с state management
- **Dependency Injection** с providedIn: 'root'

### State Management
- **Angular Signals** для реактивного состояния
- **Computed signals** для вычисляемых значений
- **RxJS Observables** для асинхронных операций
- **BehaviorSubject** для совместимости с RxJS

### Роутинг
- **Lazy Loading** компонентов
- **Route Parameters** для детальных страниц
- **Navigation Guards** (заготовки)
- **Wildcard routes** для 404 страниц

### Формы
- **Reactive Forms** с валидацией
- **Template-driven Forms** с ngModel
- **Dynamic Forms** с FormArray
- **Custom Validators** и error handling

### Директивы
- **Структурные директивы** (*ngFor, *ngIf, *ngSwitch)
- **Атрибутивные директивы** (ngClass, ngStyle)
- **Кастомные директивы** (HighlightDirective)

### Pipes
- **Встроенные pipes** (date, currency, slice, titlecase)
- **Кастомные pipes** (CustomCurrencyPipe)
- **Pure и Impure pipes**

### UI/UX
- **Angular Material** компоненты
- **Responsive Design** с CSS Grid и Flexbox
- **Анимации** и transitions
- **Loading States** и error handling

## 📁 Структура проекта

```
src/app/
├── components/           # Компоненты приложения
│   ├── header/          # Шапка с навигацией
│   ├── home/            # Главная страница
│   ├── product-list/    # Список товаров
│   ├── product-detail/  # Детали товара
│   ├── user-list/       # Список пользователей
│   ├── cart/            # Корзина покупок
│   ├── profile/         # Профиль пользователя
│   ├── forms-demo/      # Демо форм
│   └── not-found/       # 404 страница
├── services/            # Сервисы
│   ├── user.service.ts
│   ├── product.service.ts
│   └── cart.service.ts
├── models/              # TypeScript интерфейсы
│   ├── user.model.ts
│   ├── product.model.ts
│   └── cart-item.model.ts
├── pipes/               # Кастомные pipes
│   └── custom-currency.pipe.ts
├── directives/          # Кастомные директивы
│   └── highlight.directive.ts
├── guards/              # Route guards (заготовки)
├── mocks/               # Моковые данные
└── app.routes.ts        # Конфигурация роутинга
```

## 🛠 Технологии

- **Angular 20** - основной фреймворк
- **TypeScript** - типизированный JavaScript
- **Angular Material** - UI компоненты
- **RxJS** - реактивное программирование
- **SCSS** - препроцессор CSS
- **Yarn** - менеджер пакетов

## 🚀 Запуск приложения

1. Установите зависимости:
```bash
yarn install
```

2. Запустите приложение:
```bash
yarn start
```

3. Откройте браузер по адресу: `http://localhost:4200`

## 📱 Страницы приложения

- **/** - Главная страница с hero секцией и рекомендуемыми товарами
- **/products** - Каталог товаров с фильтрацией и поиском
- **/products/:id** - Детальная страница товара
- **/users** - Список пользователей
- **/forms** - Демонстрация различных типов форм
- **/cart** - Корзина покупок
- **/profile** - Профиль пользователя
- **/404** - Страница не найдена

## 🎯 Демонстрируемые возможности Angular

### Компоненты
- Standalone компоненты
- Lifecycle hooks (OnInit, OnDestroy)
- Input/Output свойства
- View encapsulation
- Content projection

### Сервисы
- Dependency injection
- Singleton services
- State management
- HTTP клиент (имитация)

### Директивы
- Структурные директивы
- Атрибутивные директивы
- Кастомные директивы
- Host listeners

### Pipes
- Встроенные pipes
- Кастомные pipes
- Pure vs Impure pipes
- Async pipes

### Формы
- Reactive forms
- Template-driven forms
- Валидация
- Динамические поля

### Роутинг
- Lazy loading
- Route parameters
- Query parameters
- Navigation guards

### State Management
- Angular Signals
- RxJS Observables
- BehaviorSubject
- Computed values

## 🔧 Дополнительные возможности

- **Responsive Design** - адаптивный дизайн для всех устройств
- **Material Design** - современный UI/UX
- **TypeScript** - строгая типизация
- **SCSS** - продвинутые стили
- **Анимации** - плавные переходы
- **Loading States** - индикаторы загрузки
- **Error Handling** - обработка ошибок

## 📝 Примечания

Это демонстрационное приложение создано для показа всех основных возможностей Angular. Все данные являются моковыми и используются только для демонстрации функциональности.

Приложение использует новейшие возможности Angular 20, включая standalone компоненты, signals и современные паттерны разработки.