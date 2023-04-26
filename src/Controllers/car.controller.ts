import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/car.service';

const carNotFound = 'Car not found';
const invalidId = 'Invalid mongo id';
class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async createNewCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createNewCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      return this.res.status(500).json({ message: 'Check the fields' });
    }
  }

  public async getAllCars() {
    try {
      const allCars = await this.service.getAllCars();
      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.res.status(404).json({ message: 'No results found' });
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      if (!car) {
        return this.res.status(404).json({ message: carNotFound });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: invalidId });
    }
  }

  public async updateCar() {
    const { id } = this.req.params;
    const { body } = this.req;
    try {
      const car = await this.service.updateCar(id, body);
      if (!car) {
        return this.res.status(404).json({ message: carNotFound });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: invalidId });
    }
  }

  public async deleteCar() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      if (!car) {
        return this.res.status(404).json({ message: carNotFound });
      }
      await this.service.deleteCar(id);
      return this.res.status(200).end();
    } catch (error) {
      return this.res.status(422).json({ message: invalidId });
    }
  }
}

export default CarController;