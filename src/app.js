import express, { json, urlencoded } from 'express';
import routes from './routes';

require('dotenv').config();
const logger = require('./logger').default(process.env)(module);

const app = express();

// Configuring Body Parser middleware to parse the incoming JSON and Url-encoded data
app.use(json());
app.use(urlencoded({ extended: true }));

// routing it to common router
app.use('/webhook', routes);

// Sets server port and logs message on success
const port = process.env.PORT || 1337;
app.listen(port, () => logger.info(`Webhook is listening on port ${port}`));

export default app;
