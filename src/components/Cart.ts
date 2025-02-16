import { View } from "./base/Component";
import { createElement, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

interface ICartView {
    items: HTMLElement[];
    price: number;
    selected: string[];
}

export class Cart<T> extends View<ICartView> {
    protected _list: HTMLElement;
    protected _price: HTMLElement;
	protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._price = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');
        
        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open')
            });
        }

        this.items=[]
    }

    toggleButton(state: boolean) {
		this.setDisabled(this._button, !state);
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
            this.toggleButton(true);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
            this.toggleButton(false);
		}
	}

	set price(price: number) {
        this.setText(this._price, `${price} синапсов`)
    }
}