import { Request, Response, Router } from 'express';
import MotorcycleController from '../Controllers/motorcycle.controller';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response) => new MotorcycleController(req, res).createNewMotorcycle(),
);

router.get('/', (req: Request, res: Response) => new MotorcycleController(req, res).getAll());

router.get('/:id', (req: Request, res: Response) => new MotorcycleController(req, res).getById());

router.put('/:id', (req: Request, res: Response) => new MotorcycleController(req, res).update());

router.delete(
  '/:id',
  (req: Request, res: Response) => new MotorcycleController(req, res).deleteMotorcycle(),
);

export default router;