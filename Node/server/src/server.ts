import cors from 'cors';
import express from 'express';
import { errors } from 'celebrate';

import Routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// handle errors from 'celebrate'
app.use(errors());

app.use(Routes);

app.listen(3333, () => console.log('Server is ON and listening to port 3333'));

