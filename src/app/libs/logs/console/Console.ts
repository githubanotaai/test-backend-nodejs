import { ILog } from '../contracts';

export class Console implements ILog {
	emergency(message: string, data?: object): void {
		console.error(message, data);
	}

	alert(message: string, data?: object): void {
		console.log(message, data);
	}

	critical(message: string, data?: object): void {
		console.error(message, data);
	}

	error(message: string, data?: object): void {
		console.error(message, data);
	}

	warning(message: string, data?: object): void {
		console.warn(message, data);
	}

	notice(message: string, data?: object): void {
		console.log(message, data);
	}

	info(message: string, data?: object): void {
		console.info(message, data);
	}

	debug(message: string, data?: object): void {
		console.debug(message, data);
	}
}
