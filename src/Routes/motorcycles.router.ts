import { Request, Response, Router } from 'express';
import MotorcycleController from '../Controllers/motorcycle.controller';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response) => new MotorcycleController(req, res).createNewMotorcycle(),
);

export default router;