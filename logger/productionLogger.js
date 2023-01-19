import { createLogger, format, transports } from 'winston';
const { combine, timestamp,  printf } = format;

const myFormat = printf(({ level, message,  timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});


const productionLogger = () => {
    return createLogger({
        level: "info",
        format: combine(
            timestamp(),
            myFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename:"myerror.log"}),
        ]
    });
}
export default productionLogger;