import { RegisterProductValidate } from '@app/validators';
import { response } from '@main/factories';

describe('Validate class RegisterProductValidate', () => {
	const validate = new RegisterProductValidate();

	it('valid function handle', async () => {
		const data = {
			title: 'title',
			description: 'description',
			price: 5,
			categorys: ['fasdfsdafads', 'fdsafdsdsa'],
		};
		const handle = await validate.handle({
			client: 'rest',
			data,
		});

		expect(handle).toEqual(response.ok({}));
	});

	it('invalid function handle', async () => {
		const data = {
			title: '  ',
			description: '',
			price: 5,
			categorys: ['dfsafdsa', 'fdasfadsfdas'],
		};
		const handle = await validate.handle({
			client: 'rest',
			data,
		});

		expect(handle).toEqual(
			response.errorValidation({
				data: ['Name Product invalid!', 'Description Product invalid!'],
			})
		);
	});
});
