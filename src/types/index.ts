// Типы данных
type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};
  
type CartItem = {
    product: Product;
    quantity: number;
};
  
type ContactInfo = {
    email: string;
    phone: string;
};
  
type Order = {
    deliveryAddress: string;
    paymentMethod: string;
    contactInfo: ContactInfo;
};
  
// Интерфейсы моделей
interface IProductModel {
    fetchProducts(): Promise<void>;
    getProductById(id: string): Product | null;
}
  
interface ICartModel {
    addToCart(product: Product): void;
    removeFromCart(productId: string): void;
    getCartItems(): CartItem[];
    clearCart(): void;
}
  
interface IOrderModel {
    setDeliveryAddress(address: string): void;
    setPaymentMethod(method: string): void;
    setContactInfo(email: string, phone: string): void;
    submitOrder(): Promise<void>;
}
  
// Интерфейсы представлений
interface IProductView {
    render(products: Product[]): void;
    showProductDetails(product: Product): void;
}
  
interface ICartView {
    render(cartItems: CartItem[]): void;
    showCart(): void;
    hideCart(): void;
}
  
interface IOrderView {
    renderStep(step: number): void;
    showError(message: string): void;
    showSuccess(): void;
}
  
// Интерфейс EventEmitter
interface IEventEmitter {
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    emit(event: string, data?: any): void;
}