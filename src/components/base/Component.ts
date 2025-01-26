import { IEvents } from './events';

export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    // Скрыть
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Показать
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    
    render(data?: Partial<T & { index?: number }>): HTMLElement {
        Object.assign(this as object, data ?? {});
    
        // Обновляем индекс, если он передан
        if (data?.index !== undefined) {
            const indexElement : HTMLElement = this.container.querySelector('.basket__item-index');
            if (indexElement) {
                this.setText(indexElement, data.index.toString())
            } else {
                console.error('Элемент с классом .basket__item-index не найден');
        }
    }
    
        return this.container;
    }
}

export class View<T> extends Component<T> {
	constructor(container: HTMLElement, protected readonly events: IEvents) {
		super(container);
	}
}