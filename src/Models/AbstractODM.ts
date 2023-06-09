import { Model, Schema, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;

  constructor(
    protected modelName: string,
    protected schema: Schema,
  ) {
    this.model = models[modelName] || model(modelName, schema);
  }

  public async createNew(veicolo: T): Promise<T> {
    return this.model.create({ ...veicolo });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, body: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
  }

  public async deleteVehicle(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: id });
  }
}

export default AbstractODM;
