import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IOrder } from '../types/index';

export class OrderForm extends Form<IOrder> {
    protected _paymentMethodCard: HTMLButtonElement;
    protected _paymentMethodCash: HTMLButtonElement;
	protected _deliveryAddress: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentMethodCard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
        this._paymentMethodCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);
        this._deliveryAddress = ensureElement<HTMLInputElement>('.form__input[name=address]', this.container);

        this._paymentMethodCard.addEventListener('click', () => {
            this.paymentMethod = 'card';
            this.onInputChange('paymentMethod', 'card');
        });
        this._paymentMethodCash.addEventListener('click', () => {
            this.paymentMethod = 'cash';
            this.onInputChange('paymentMethod', 'cash');
        })
    }

    set paymentMethod(value: 'cash' | 'card') {
        this._paymentMethodCard.classList.toggle('button_alt-active');
        this._paymentMethodCash.classList.toggle('button_alt-active');
    }

set deliveryAddress(value: string) {
    this._deliveryAddress.value = value;
}
}