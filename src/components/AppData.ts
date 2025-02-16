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
        items: [],
        total: 0,
    };
    order: IOrder = {
        address: '',
        payment: 'card',
        email: '',
        phone: '',
    }
    formErrors: FormErrors = {};

    constructor(protected events: IEvents) {
		super()
	}

    setItems(items: IProduct[]) {
        this.items = items;
        this.events.emit('items:change', this.items);
    }

    setPreview(item: IProduct) {
		this.preview = item;
		this.events.emit('preview:change', this.preview);
	}

	isInCart(item: IProduct) {
		return this.cart.items.includes(item.id);
	}

	addToCart(item: IProduct) {
		this.cart.items.push(item.id);
		this.cart.total += item.price;
		this.events.emit('cart:change', this.cart);
	}

	removeFromCart(item: IProduct) {
		this.cart.items = this.cart.items.filter((id) => id !== item.id);
		this.cart.total -= item.price;
		this.events.emit('cart:change', this.cart);
	}

	clearCart() {
		this.cart.items = [];
		this.cart.total = 0;
		this.events.emit('cart:change');
	}

	setPaymentMethod(method: 'cash' | 'card') {
		this.order.payment = method;
	}

	setOrderField(field: keyof IOrder, value: string) {
		if (field === 'payment') {
			this.setPaymentMethod(value as 'cash' | 'card');
		} else {
			this.order[field] = value
		}
	
	}

    validateOrderForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
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
			address: '',
            payment: 'card',
            email: '',
            phone: '',
		};
		this.events.emit('order:clear')
	}
}