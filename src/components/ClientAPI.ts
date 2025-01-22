import { Api, ApiListResponse } from './base/api';
import { IProduct, IOrder } from '../types';

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IClientAPI {
	getProductList: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	createOrder: (order: IOrder) => Promise<IOrderResult>;
}

export class ClientAPI extends Api implements IClientAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product/').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	createOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then(
			(data: IOrderResult) => data
		);
	}
}