import express, { json } from 'express';
import facebookRouter from './platforms/facebook/router';
import twitterRouter from './platforms/twitter/router';
import youtubeRouter from './platforms/youtube/router';

const app = express();
app.use(json());

// Create a route for facebook - https://your.domain/webhook/facebook
app.use('/facebook', facebookRouter);

// Create a route for twitter - https://your.domain/webhook/twitter
app.use('/twitter', twitterRouter);


// Create a route for twitter - https://your.domain/webhook/youtube
app.use('/youtube', youtubeRouter);


// Create a route for healthcheck - https://your.domain/webhook/
app.use('/', (req, res) => res.status(200).send('OK'));

export default app;
