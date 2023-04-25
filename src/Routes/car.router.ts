import { Request, Response, Router } from 'express';
import CarController from '../Controllers/car.controller';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response) => new CarController(req, res).createNewCar(),
);

export default router;