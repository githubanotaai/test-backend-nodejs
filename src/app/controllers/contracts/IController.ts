import { IValidate } from '@app/validators/contracts';
import { TClients } from '@main/contracts';

type TStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 422 | 500;

type TResponse<Data = any> = {
	status: TStatus;
	data?: Data | Data[];
	type: 'success' | 'error';
	message?: string;
};

type TRequest<Data = any, Params = any, Query = any> = {
	client: TClients;
	data: Data;
	params?: Params;
	query?: Query;
	headers?: any;
	accessToken?: any;
};

interface IController<DataResponse = any> {
	handle(request: TRequest): Promise<TResponse<DataResponse>>;
}

export { IController, TRequest, TStatus, TResponse };
