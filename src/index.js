import 'dotenv/config';
import app from './app.js';
import logger from './logs/logger.js';
import config from './config/env.js';
import { sequelize } from './database/database.js';

async function main() {
    await sequelize.sync({ force: false });
    //console.log('222', config.PORT);
    const port = config.PORT;
    app.listen(port);
    //app.listen(3000);
    //console.log('server is running on: http://localhost:3000');
    logger.info('server is running on:' + process.env.PORT);
    logger.info('Server strated on port 3000');
    logger.warn('this is a warning message');
    logger.fatal('this is a fatal message');
}


main();

// node src/index.js
// npm run start