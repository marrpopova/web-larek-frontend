# Проектная работа "Веб-ларек"  

### Архитектура проекта  

Архитектура проекта построена на принципах изолированности, единственной ответственности и масштабируемости. В основе лежит паттерн MVP (Model-View-Presenter) для обеспечения модульности и удобства.  

## Основные части архитектуры:
### Данные (Model):
Описывают бизнес-логику и хранят информацию о товарах, корзине и заказах.
Включают трансформацию данных, получаемых от API, в удобный для представления формат.
### Представление (View):
Отвечают за отображение данных пользователю.
Реализуют модальные окна, страницы и компоненты интерфейса, такие как каталог, корзина, форма оформления заказа.
### Презентер (Presenter):
Контролируют взаимодействие между данными и представлениями.
Реализуют обработку событий и управление состоянием приложения через EventEmitter.  

## Компоненты приложения  
  1. Карточка товара (содержит данные названия товара, описания, цены, категории, изображения).
  2. Форма для заказа (содержит данные способа оплаты, адреса доставки, почты, телефона).
  3. Каталог товаров (отображает каталог).
  4. Корзина с товарами (отображает список выбранных товаров с возможностью редактирования: удаление/добавление в корзину, очищение корзины)
## Данные в приложении  
  - Название товара
  - Описание товара
  - Цена товара
  - Категория товара
  - Изображение товара
  - Способ оплаты
  - Адрес доставки
  - Почта
  - Телефон
## Действия в приложении 
  - Выбор способа оплаты и адреса
  - Указание почты и телефона
  - Очистка данных

  - Добваление в корзину
  - Удаление из корзины
  - Очищение корзины
  - Получение списка товаров в корзине
    
### Стек: HTML, SCSS, TS, Webpack

### Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

### Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Типы данных 
### Product
Содержит данные карточек товара.  

Поля:  
  name: string // Название товара  
  id: string; // Айди товара
  description: string // Описание товара  
  price: number // Цена товара  
  category: string // Категория товара  
  image: string // Ссылка на изображение товара 

### ContactInfo
Содержит контактные данные покупателя.  

Поля:  
  email: string // Почта покупателя  
  phone: string // Телефон покупателя  
  
### Order
Содержит данные для заказа.  

Поля:  
  deliveryAddress: string // Адрес доставки  
  paymentMethod: string // Способ оплаты  
  contactInfo: ContactInfo  
### CartItem
Содержит данные элемента корзины.  

Поля:  
  product: Product;  
  quantity: number // Кол-во товаров
 
## Model
### ProductModel  
Назначение: Управляет данными товаров, полученными с сервера.  
Свойства: _products: Product[] // Список товаров  
Конструктор: -  
Методы:  
fetchProducts(): Promise<void>  
getProductById(id: string): Product | null // Возращает данные товара по айди  
### CartModel  
Назначение: Управляет данными корзины.  
Свойства: _cartItems: CartItem[] // Массив товаров в корзине  
Конструктор: -  
Методы:  
addToCart(product: Product): void // Добваляет товар в корзину(параметрs: объект товара)  
removeFromCart(productId: string): void // Удаляет товар из корзины(параметры: айди товара)  
getCartItems(): CartItem[] // Возращает массив товаров в корзине.  
clearCart(): void // Очищает корзину.  
### OrderModel  
Назначение: Управляет процессом оформления заказа.  
Свойства:  
_deliveryAddress: string | null // Адрес доставки  
_paymentMethod: string | null // Способ оплаты  
_contactInfo : ContactInfo | null // Контактные данные покупателя  
Конструктор: -  
Методы:  
setDeliveryAddres(address: string): void // Устанавливает адрес доставки  
setPaymentMethod(method: string): void // Устанавливает способ оплаты  
setContactInfo(email: string, phone: string): void // Сохраняет контактную информацию  
submitOrder(): Promise<void> // Отправляет данные заказа на сервер  
## View  
### ProductView<T>
Назначение: Отвечает за отображение списка товаров.  
Свойства: _container: HTMLElement // Элемент DOM списка товаров  
Конструктор: _container: HTMLElement // Контейнер для отображения товаров
Методы:  
render(products: T[]): void // Отображает список товаров(параметры: массив объектов товаров)  
showProductDetails(product: T): void // Отображает информацию о выбранном товаре в модальном окне.(параметры: объект товара)  
### CardView<T>  
Назначение: Отвечает за отображение корзины.  
Свойства:  _container: HTMLElemant // Элемент DOM для корзины.  
Конструктор: _container: HTMLElement
Методы:  
render(cartItems: T[]): void // Отображает список товаров в корзине  
showCart(): void // Открывает модальное окно корзины  
hideCart(): void // Закрывает модальное окно корзины  
### OrderView<T>  
Назначение: Отвечает за отображение процесса оформления заказа  
Свойства: _container: HTMLElement // Элемент DOM для формы заказа.  
Конструктор: _container: HTMLElement // Контейнер для отображения формы заказа
Методы:  
renderStep(step: string): void // Отображает сообщение об ошибке  
showError(message: string): void // Отображает сообщение об ошибке  
showSuccess(): void // Отображает сообщение об успешной оплате  
## Presenter  
### AppPresenter  
Назначение: Связывает модели и представления.  
Свойства:  
_productModel: ProductModel  
_cartModel: CartModel  
_orderModel: OrderModel  
_productView: ProductView<Product>  
_cartView: CartView<CartItem>  
_orderView: OrderView<Order>  
Констркутор: productModel: ProductModel, cartModel: CartModel, orderModel: OrderModel, productView: ProductView<Product>, cartView: CartView<CartItem>, orderView: OrderView<Order>  
Методы:  
initialize(): void // Инициализирует приложение, загружает данные  
handleAddToCart(productId: string): void // Добавляет товар в корзину  
handleRemoveFromCart(productId: string): void // Удаляет товар из корзины  
handleOrderSubmission(): void // Отправляет заказ  
### EventEmitter<T>
Назначение: Управляет событиями в приложении, позволяет подписываться на события и вызывать их.
