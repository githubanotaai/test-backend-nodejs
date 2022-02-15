export type Tid = string | number;

export type TPagination = {
	pagination: {
		currentPage: number;
		pages: number;
		rows: number;
	};
};

export interface IRepository {}
