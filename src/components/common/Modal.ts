import { View } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IModalDate {
    content: HTMLElement;
}

export class Modal extends View<IModalDate> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._closeButton= ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this._closeButton.addEventListener('click', this.closeModal.bind(this));
        this.container.addEventListener('click', this.closeModal.bind(this)); 
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }
    
    set content(value: HTMLElement) {
        this._content.replaceChildren(value)
    }

    openModal() {
        this.container.classList.toggle('modal_active', true);
        this.events.emit('modal:open')
    }

    closeModal() {
        this.container.classList.toggle('modal_active', false);
        this._content.innerHTML='';
        this.events.emit('modal:close')
    }

    render(data: IModalDate): HTMLElement {
        super.render(data);
        this.openModal();
        return this.container;
    }
}