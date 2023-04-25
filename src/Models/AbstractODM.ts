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
    if (id) {
      return this.model.findById(id);
    }
    return null;
  }

  public async update(id: string, body: Partial<T>): Promise<T | null> {
    if (id) {
      return this.model.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
    }
    return null;
  }
}

export default AbstractODM;
