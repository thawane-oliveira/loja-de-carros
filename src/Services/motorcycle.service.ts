import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/motorcycle.model';

class MotorcycleService {
  public createMotorDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  protected motorM = new MotorcycleModel();

  public async createNewMotorcycle(motorcycle: IMotorcycle) {
    const newCar = await this.motorM.createNew(motorcycle);
    return this.createMotorDomain(newCar);
  }

  public async getAll() {
    const allMotorcycles = await this.motorM.getAll();
    return allMotorcycles.map((m) => new Motorcycle(m));
  }

  public async getById(id: string) {
    const motorcycle = await this.motorM.getById(id);
    if (motorcycle) {
      const domain = new Motorcycle(motorcycle);
      return domain;
    }
    return null;
  }

  public async update(id: string, body: IMotorcycle) {
    const updated = await this.motorM.update(id, body);
    if (updated) {
      const domain = new Motorcycle(updated);
      return domain;
    }
    return null;
  }

  public async delete(id: string) {
    const motorcycle = await this.motorM.getById(id);
   
    if (motorcycle) { await this.motorM.deleteVehicle(id); }
  }
}

export default MotorcycleService;
