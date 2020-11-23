import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const port = process.env.PORT;

app.get('/', (req, res) => res.send('App is working'));

app.listen(port, () => console.log(`App started listening on port ${port}`));

export default app;