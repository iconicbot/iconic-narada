import { format as _format, transports as _transports, createLogger } from 'winston';
import { dirname } from 'path';

require('dotenv').config();

function getLabel(moduleName) {
  if (typeof (moduleName) === 'string') {
    return moduleName;
  }
  const projectPath = dirname(require.main.filename);
  let parts = moduleName.filename.replace(__dirname, 'Path');
  parts = parts.replace(`${projectPath}/`, '');
  return parts.replace('/', '.').replace('.js', '').replace('/index', '');
}

function Logger(CONFIG) {
  /**
   * Logger factory to create winston logger labelled with module.
   * @param {Object} moduleName Module from where the logger is called
   * @return {Logger} Logger
   */
  return (moduleName) => {
    const myFormat = _format.combine(
      _format.splat(),
      _format.timestamp(),
      _format.label({ label: getLabel(moduleName) }),
      _format.simple(),
      _format.printf(info => `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${JSON.stringify(info.message, null, 4)}`),
    );

    const ConsoleLogger = new _transports.Console({
      level: CONFIG.LOG_LEVEL || 'silly',
      format: myFormat,
    });

    const FileLogger = new _transports.File({
      level: CONFIG.LOG_LEVEL || 'silly',
      format: myFormat,
      filename: 'logfile.log',
    });

    return createLogger({
      level: CONFIG.LOG_LEVEL || 'silly',
      transports: [
        ConsoleLogger,
        FileLogger,
      ],
    });
  };
}

export default Logger;
