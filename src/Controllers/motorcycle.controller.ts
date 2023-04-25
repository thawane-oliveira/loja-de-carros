import { Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/motorcycle.service';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private service: MotorcycleService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new MotorcycleService();
  }

  public async createNewMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createNewMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      return this.res.status(500).json({ message: 'Check the fields' });
    }
  }

  public async getAll() {
    try {
      const allMotorcycles = await this.service.getAll();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      return this.res.status(404).json({ message: 'No results found' });
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.getById(id);
      if (!motorcycle) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  public async update() {
    const { id } = this.req.params;
    const { body } = this.req;
    try {
      const motorcycle = await this.service.update(id, body);
      if (!motorcycle) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}

export default MotorcycleController;