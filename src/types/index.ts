//тип данных товара
export interface Product {
    id: string;            // Идентификатор товара
    name: string;          // Название товара
    description: string;   // Описание товара
    price: number;         // Цена товара
    imageUrl: string;      // Ссылка на изображение товара
    stock: number;         // Количество товара на складе
}

//тип данных покупателя
export interface Customer {
    name: string;          // Имя покупателя
    email: string;         // Email покупателя
    phone: string;         // Телефон покупателя
}

//тип данных заказа
export interface Order {
    id: string;            // Идентификатор заказа
    products: { 
      id: string; 
      quantity: number; 
    }[];                   // Список товаров в заказе
    total: number;         // Общая сумма заказа
    customer: Customer;    // Данные покупателя
    paymentMethod: string; // Способ оплаты
    address: string;       // Адрес доставки
}

// Интерфейс API-клиента
export interface IApiClient {
    getProducts(): Promise<Product[]>; // Получить список товаров
    getProductById(id: string): Promise<Product>; // Получить информацию о товаре
    createOrder(order: Order): Promise<{ orderId: string }>; // Создать заказ
}

// Товар, который в корзине
export interface CartItem {
    productId: string;  // ID товара
    quantity: number;   // Количество
}

// Корзина
export interface ICart {
    items: CartItem[];  // Список товаров в корзине
    total: number;      // Общая сумма товаров в корзине
}

  export interface View {
    render(): void;          // Метод для рендеринга компонента
    update(data: any): void; // Метод для обновления данных
}
  

export interface Model {
    fetchData(): Promise<any>; // Метод для получения данных
    updateData(data: any): void; // Метод для обновления данных
}
  

export interface Presenter {
    initialize(): void; // Инициализация работы Presenter
}

// Роли событий
export enum Events {
    ProductAddedToCart = 'ProductAddedToCart',
    ProductRemovedFromCart = 'ProductRemovedFromCart',
    CartUpdated = 'CartUpdated',
    CheckoutStarted = 'CheckoutStarted',
    CheckoutCompleted = 'CheckoutCompleted',
}
  
// Интерфейсы событий
export interface EventPayloads {
    [Events.ProductAddedToCart]: { productId: string }; // ID добавленного товара
    [Events.ProductRemovedFromCart]: { productId: string }; // ID удаленного товара
    [Events.CartUpdated]: { cart: ICart }; // Обновленная корзина
    [Events.CheckoutStarted]: null; // Начало оформления заказа
    [Events.CheckoutCompleted]: { orderId: string }; // Завершение заказа
}