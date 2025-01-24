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
    items: string[];
    total: number;
};
  
export interface IOrder {
    address: string;
    payment: 'cash' | 'card';
    email: string;
    phone: string;
};