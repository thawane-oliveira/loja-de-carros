import express from 'express';
import carRouter from './Routes/car.router';
import motorcyclesRouter from './Routes/motorcycles.router';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

app.use('/motorcycles', motorcyclesRouter);

export default app;
