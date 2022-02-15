import { TClients } from '@main/contracts';

export interface IDeleteProductUseCase {
	execute(id: string, client?: TClients): Promise<boolean>;
}
