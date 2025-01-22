import { ICartItem, IOrder, IProduct } from "../types";
import { IEvents, EventEmitter } from "./base/events";

type FormErrors = Partial<Record<keyof IOrder, string>>;

interface IAppData {
	items: IProduct[];
    preview: IProduct | null;
    cart: ICartItem;
    order: IOrder;
    formErrors: FormErrors;
}

export class AppData extends EventEmitter implements IAppData {
    items: IProduct[] = [];
    preview: IProduct | null = null;
    cart: ICartItem = {
        products: [],
        quantity: 0,
    };
    order: IOrder = {
        deliveryAddress: '',
        paymentMethod: 'card',
        email: '',
        phone: '',
    }
    formErrors: FormErrors = {};

    constructor(protected events: IEvents) {
		super()
	}

    setItems() {
        this.items = this.items;
        this.events.emit('items:change', this.items);
    }

    setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:change', this.preview);
	}

	isInCart(item: IProduct) {
		return this.cart.products.includes(item.id);
	}

	addToCart(item: IProduct) {
		this.cart.products.push(item.id);
		this.cart.quantity += item.price;
		this.events.emit('cart:change', this.cart);
	}

	removeFromCart(item: IProduct) {
		this.cart.products = this.cart.products.filter((id) => id !== item.id);
		this.cart.quantity -= item.price;
		this.events.emit('cart:change', this.cart);
	}

	clearCart() {
		this.cart.products = [];
		this.cart.quantity = 0;
		this.events.emit('cart:change');
	}

	setPaymentMethod(method: 'cash' | 'card') {
		this.order.paymentMethod = method;
	}

	setOrderField(field: keyof IOrder, value: string) {
		if (field === 'paymentMethod') {
			this.setPaymentMethod(value as 'cash' | 'card');
		} else {
			this.order[field] = value
		}
	}

    validateOrderForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.deliveryAddress) {
			errors.deliveryAddress = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('orderFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

    validateContactsForm() {
        const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
        }
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

    clearOrder() {
		this.order = {
			deliveryAddress: '',
            paymentMethod: 'card',
            email: '',
            phone: '',
		};
	}
}