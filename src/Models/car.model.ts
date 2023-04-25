import { model, models, Model, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarModel {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async createNewCar(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async getAllCars(): Promise<ICar[]> {
    return this.model.find();
  }

  public async getById(id: string): Promise<ICar | null> {
    if (id) {
      return this.model.findById(id);
    }
    return null;
  }
}

export default CarModel;