import { TResponse, TStatus } from '@app/controllers/contracts';

export type TParamsDefault<Data = any> = {
	data?: Data | Data[];
	message?: string;
	status?: TStatus;
};

export class ResponseHelper {
	ok<R = any>({ data, message }: TParamsDefault<R>): TResponse<R> {
		return {
			type: 'success',
			status: 200,
			message,
			data,
		};
	}

	created<R = any>({ data, message }: TParamsDefault<R>): TResponse<R> {
		return {
			type: 'success',
			status: 201,
			message,
			data,
		};
	}

	empty(): TResponse {
		return {
			type: 'error',
			status: 204,
		};
	}

	error({ message, data, status = 400 }: TParamsDefault): TResponse {
		return {
			type: 'error',
			status: status,
			message,
			data,
		};
	}

	errorValidation({ message = 'Validation Error.', data }: TParamsDefault): TResponse {
		return {
			type: 'error',
			status: 422,
			message,
			data: {
				errors: data,
			},
		};
	}

	unauthenticated(): TResponse {
		return {
			type: 'error',
			status: 401,
			message: 'Unauthenticated.',
		};
	}

	forbidden(): TResponse {
		return {
			type: 'error',
			status: 403,
			message: 'Forbidden.',
		};
	}

	notFound(): TResponse {
		return {
			type: 'error',
			status: 404,
			message: 'Not Found.',
		};
	}

	internalServerError(): TResponse {
		return {
			type: 'error',
			status: 500,
			message: 'Internal Server Error.',
		};
	}
}
