export interface ILog {
	emergency(message: string, data?: object): void;

	alert(message: string, data?: object): void;

	critical(message: string, data?: object): void;

	error(message: string, data?: object): void;

	warning(message: string, data?: object): void;

	notice(message: string, data?: object): void;

	info(message: string, data?: object): void;

	debug(message: string, data?: object): void;
}
