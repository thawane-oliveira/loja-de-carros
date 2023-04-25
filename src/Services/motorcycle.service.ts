import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/motorcycle.model';

class MotorcycleService {
  public createMotorDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  protected motorM = new MotorcycleModel();

  public async createNewMotorcycle(motorcycle: IMotorcycle) {
    const newCar = await this.motorM.createNew(motorcycle);
    return this.createMotorDomain(newCar);
  }
}

export default MotorcycleService;
