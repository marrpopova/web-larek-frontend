import { View } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends View<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errorss: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errorss = ensureElement<HTMLElement>('.form__errorss', this.container);
        
        this.container.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
			const field = target.name as keyof T;
            const value = target.value;
			this.onInputChange(field, value);
        })
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errorss(value: string) {
        this.setText(this._errorss, value);
    }

    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;

    }
}