import { Request, Response, Router } from 'express';
import CarController from '../Controllers/car.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => new CarController(req, res).createNewCar());

router.get('/', (req: Request, res: Response) => new CarController(req, res).getAllCars());

router.get('/:id', (req: Request, res: Response) => new CarController(req, res).getById());

router.put('/:id', (req: Request, res: Response) => new CarController(req, res).updateCar());

router.delete('/:id', (req: Request, res: Response) => new CarController(req, res).deleteCar());

export default router;