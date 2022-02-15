import { RegisterCategoryProductValidate } from '@app/validators';
import { response } from '@main/factories';

describe('Validate class RegisterCategoryProductValidate', () => {
	const validate = new RegisterCategoryProductValidate();

	it('valid function handle', async () => {
		const data = {
			title: 'Ok',
		};
		const handle = await validate.handle({
			client: 'rest',
			data,
		});

		expect(handle).toEqual(response.ok({}));
	});

	it('invalid function handle', async () => {
		const data = {
			title: '   ',
		};
		const handle = await validate.handle({
			client: 'rest',
			data,
		});

		expect(handle).toEqual(
			response.errorValidation({
				data: ['Category invalid!'],
			})
		);
	});
});
