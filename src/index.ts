import expres from 'express';
import routes from './routes';

const app = expres();

app.use(routes);

app.listen(3333);
