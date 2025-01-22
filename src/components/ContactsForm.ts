import { Form } from './common/Form';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { IOrder } from '../types';

export class ContactsForm extends Form<IOrder> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = ensureElement<HTMLInputElement>('.form__input[name=email]', this.container);
		this._phone = ensureElement<HTMLInputElement>('.form__input[name=phone]', this.container);
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}
