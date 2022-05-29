export class Logger {
  private static jsonErrorReplacer(_key: any, value: { name: any; message: any; stack: any }) {
    return value instanceof Error ? { ...value, name: value.name, message: value.message, stack: value.stack } : value
  }

  private static log(level: string, message: string) {
    const messageReplace = message.replace('\n', '')
    console.log(`${new Date().toJSON()} ${level} ${messageReplace}`)
  }

  public static info(message: string) {
    this.log('[INFO ]', message)
  }

  public static debug(message: string) {
    this.log('[DEBUG]', message)
  }

  public static warn(message: string, error: any) {
    this.log('[WARN ]', `${message} ~ Exception: ${JSON.stringify(error, this.jsonErrorReplacer)}`)
  }

  public static error(message: string, error?: any) {
    this.log('[ERROR]', `${message} ~ Exception: ${JSON.stringify(error, this.jsonErrorReplacer)}`)
  }
}
