import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ClientAPI } from './components/ClientAPI';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import { ensureElement, cloneTemplate } from './utils/utils';
import { ProductView } from './components/ProductView'
import { Cart } from './components/Cart';
import { OrderForm } from './components/OrderForm';
import { ContactsForm } from './components/ContactsForm';
import { Success } from './components/common/Success';
import { AppData } from './components/AppData';
import { IOrder, IProduct } from './types';
import { Card } from './components/Card';

const events = new EventEmitter();
const api = new ClientAPI(CDN_URL, API_URL);
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const modalCardTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

// Модель данных приложения
const appData = new AppData(events);

// Глобальные контейнеры
const page = new ProductView(document.body, events);
const modal = new Modal(modalCardTemplate, events);

// Переиспользуемые части интерфейса
const cart = new Cart (cloneTemplate(basketTemplate), events);;
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events, {
  onClick: () => modal.closeModal(),
});

// Дальше идет бизнес-логика

// Изменились элементы каталога
events.on('items:change', () => {
	page.gallery = appData.items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
            image: item.image,
            description: item.description
		});
	});
});

// Открыть лот
events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

// Изменен открытый выбранный лот
events.on('preview:change', (item: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (appData.isInCart(item)) {
				appData.removeFromCart(item);
				card.button = 'В корзину';
			} else {
				appData.addToCart(item);
				card.button = 'Удалить из корзины';
			}
		},
	});

	card.button = appData.isInCart(item) ? 'Удалить из корзины' : 'В корзину';
	modal.render({ content: card.render(item) });
});

events.on('cart:change', () => {
	page.counter = appData.cart.items.length;
	cart.items = appData.cart.items.map((id) => {
		const item = appData.items.find((item) => item.id === id);
		const card = new Card(cloneTemplate(cardCartTemplate), { 
			onClick: () => appData.removeFromCart(item),
		});
		return card.render(item);
	});

	cart.price = appData.cart.total;
});

// Открыть закрытые лоты
events.on('basket:open', () => {
	modal.render({
		content: cart.render(),
	});
});

// Открыть форму заказа
events.on('order:open', () => {
	appData.clearOrder();
	modal.render({
		content: orderForm.render({
			payment: 'card',
			address: '',
			valid: false,
			errors: []
		}),
	});
});

// Отправлена форма заказа
events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось состояние валидации формы
events.on('orderFormErrors:change', (errors: Partial<IOrder>) => {
	const { payment, address: address } = errors;
	const formIsValid = !payment && !address;
	orderForm.valid = formIsValid;
	if (!formIsValid) {
		orderForm.errors = address;
	} else {
		orderForm.errors = '';
	}
});

events.on('contactsFormErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone } = errors;
	const formIsValid = !email && !phone;
	contactsForm.valid = formIsValid;
	if (!formIsValid) {
		contactsForm.errors = email || phone;
	} else {
		contactsForm.errors = '';
	}
});

// Изменилось одно из полей
events.on(
	/^order\..*:change/, (data: { field: keyof IOrder; value: string }) => {
		appData.setOrderField(data.field, data.value);
		appData.validateOrderForm();
	}
);

events.on(
	/^contacts\..*:change/, (data: { field: keyof IOrder; value: string }) => {
		appData.setOrderField(data.field, data.value);
		appData.validateContactsForm();
	}
);

// Отправлена форма контактной информации
events.on('contacts:submit', () => {
	api
		.createOrder({ ...appData.order, ...appData.cart })
		.then((data) => {
			modal.render({
				content: success.render(),
			});
			success.total = data.total;
			appData.clearCart();
			appData.clearOrder();
		})
		.catch(console.error)
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем лоты с сервера
api.getProductList()
	.then(appData.setItems.bind(appData))
	.catch(err => {
        console.log(err);
})