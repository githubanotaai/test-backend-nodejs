import dotenv from 'dotenv';
dotenv.config();

export const env = <D = string>(key: string, valueDefault?: D | string): string | D => {
	if (!valueDefault) valueDefault = '';

	return process.env[key] ?? valueDefault;
};
