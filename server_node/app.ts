'use strict';
import * as express from 'express';
import * as cors from 'cors';
import { api } from './api';

const app: express.Express = express();

app.use(cors());
app.use('/api/v1', api);

app.listen(8080, () => console.log(':8080'));
