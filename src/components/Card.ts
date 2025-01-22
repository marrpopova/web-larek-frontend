import { IProduct } from "../types";
import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";

interface ICardAction {
    onClick: (event: MouseEvent) => void;
}

const categories = new Map([
    ['софт-скил', 'soft'],
    ['другое', 'other'],
    ['дополнительное', 'additional'],
    ['кнопка', 'button'],
    ['хард-скил', 'hard']
]);

export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, action?: ICardAction) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector('.card__image');
		this._price = ensureElement<HTMLImageElement>('.card__price', container);
		this._category = container.querySelector('.card__category');
		this._button = container.querySelector('.card__button');
		this._description = container.querySelector('.card__description');

		if (action?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', action.onClick);
			} else {
				container.addEventListener('click', action.onClick);
			}
        }
    }

    set id(value: string) {
		this.container.dataset.id = value;
	}
	get id(): string {
		return this.container.dataset.id || '';
	}
	set title(value: string) {
		this.setText(this._title, value);
	}
	get title(): string {
		return this._title.textContent || '';
	}
	set price(value: string) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
		if (this._button) {
			this._button.disabled = !value;
		}
	}
	get price(): string {
		return this._price.textContent || '';
	}
	set category(value: string) {
		this.setText(this._category, value);
		if (this._category) {
			this._category.classList.add(`card__category_${categories.get(value) ? categories.get(value) : 'other'}`);
		}
	}
	get category(): string {
		return this._category.textContent || '';
	}
	set image(src: string) {
		this.setImage(this._image, src, this.title);
	}
	set description(value: string) {
		this.setText(this._description, value);
	}
	set button(value: string) {
		this.setText(this._button, value);
	}
}
