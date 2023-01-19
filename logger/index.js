
import curdLogger from './curd_logger.js';
import productionLogger from './productionLogger.js';

let logger = null;
if (process.env.NODE_ENV !== 'production') {
    logger = curdLogger()
}

if (process.env.NODE_ENV === 'production') {
    logger = productionLogger()
}
export default logger;