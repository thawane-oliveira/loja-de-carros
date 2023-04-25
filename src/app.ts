import express from 'express';
import carRouter from './Routes/car.router';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

export default app;
