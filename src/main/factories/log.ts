import { Console } from '@app/libs/logs/console';
import { ILog } from '@app/libs/logs/contracts';
import { Pino } from '@app/libs/logs/pino';
import { config } from '@main/configs';

type TChannels = 'console' | 'pino';

export const log: ILog = config.app.production ? new Console() : new Pino();

export const logChannel = (channel: TChannels): ILog => {
	if (channel == 'console') {
		return new Console();
	}
	if (channel == 'pino') {
		return new Pino();
	}

	return log;
};
