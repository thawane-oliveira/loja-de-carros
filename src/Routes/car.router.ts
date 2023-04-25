import { Request, Response, Router } from 'express';
import CarController from '../Controllers/car.controller';

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => new CarController(req, res).getAllCars(),
);

router.get(
  '/:id',
  (req: Request, res: Response) => new CarController(req, res).getById(),
);

router.post(
  '/',
  (req: Request, res: Response) => new CarController(req, res).createNewCar(),
);

export default router;