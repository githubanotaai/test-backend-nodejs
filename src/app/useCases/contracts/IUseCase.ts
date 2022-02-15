import { TClients } from '@main/contracts';

export interface IUseCase<Input = any, Output = any> {
	execute(dataInput?: Input, client?: TClients): Promise<Output>;
}
