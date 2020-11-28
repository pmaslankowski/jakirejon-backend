import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import 'dotenv/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const port = process.env.PORT;

app.use('/', router);

app.use((error, req, res, next) => {
    res.send(error);
});

app.listen(port, () => console.log(`App started listening on port ${port}`));

export default app;