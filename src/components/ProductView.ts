import {View} from './base/Component';
import {IEvents} from './base/events';
import {ensureElement} from '../utils/utils';

interface IProductView {
    gallery: HTMLElement[];
    locked: boolean;
    counter: number;
}

export class ProductView extends View<IProductView> {
    protected _counter: HTMLElement;
    protected _gallery: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._gallery = ensureElement<HTMLElement>('.gallery');
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');
        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open')
        })
    }

    set counter(value: number) {
        this.setText(this._counter, String(value))
    }
    set gallery(items: HTMLElement[]) {
        this._gallery.replaceChildren(...items);
    }
    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value)
    }
}