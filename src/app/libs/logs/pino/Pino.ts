import { ILog } from '../contracts';
import pino from 'pino';

export class Pino implements ILog {
	logger() {
		return pino({
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
				},
			},
		});
	}

	emergency(message: string, data = {}): void {
		this.logger().fatal(data, message);
	}

	alert(message: string, data = {}): void {
		this.logger().error(data, message);
	}

	critical(message: string, data = {}): void {
		this.logger().fatal(data, message);
	}

	error(message: string, data = {}): void {
		this.logger().error(data, message);
	}

	warning(message: string, data = {}): void {
		this.logger().warn(data, message);
	}

	notice(message: string, data = {}): void {
		this.logger().warn(data, message);
	}

	info(message: string, data = {}): void {
		this.logger().info(data, message);
	}

	debug(message: string, data = {}): void {
		this.logger().debug(data, message);
	}
}
