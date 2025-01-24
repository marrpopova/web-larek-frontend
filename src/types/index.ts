// Типы данных
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
};
  
export interface ICartItem {
    products: string[];
    quantity: number;
};
  
export interface IOrder {
    address: string;
    paymentMethod: 'cash' | 'card';
    email: string;
    phone: string;
};