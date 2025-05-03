import { TProductOutput, TRegisterProduct } from '@app/repositories/contracts';
import { TClients } from '@main/contracts';

export type TDataEditProductUseCase = {
	title: string;
	description?: string;
	price: number;
	categorys: string[];
};
export type TOutputEditProductUseCase = TProductOutput;

export interface IEditProductUseCase {
	execute(id: string, data: TDataEditProductUseCase, client?: TClients): Promise<TOutputEditProductUseCase | null>;
}
