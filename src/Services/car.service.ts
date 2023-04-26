import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/car.model';

class CarService {
  public createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  protected carM = new CarModel();

  public async createNewCar(car: ICar) {
    const newCar = await this.carM.createNew(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const allCars = await this.carM.getAll();
    return allCars.map((c) => new Car(c));
  }

  public async getById(id: string) {
    const car = await this.carM.getById(id);
    if (car) {
      const domain = new Car(car);
      return domain;
    }
    return null;
  }

  public async updateCar(id: string, body: ICar) {
    const updated = await this.carM.update(id, body);
    if (updated) {
      const domain = new Car(updated);
      return domain;
    }
    return null;
  }

  public async deleteCar(id: string) {
    await this.carM.deleteVehicle(id);
  }
}

export default CarService;
