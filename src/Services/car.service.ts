import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/car.model';

class CarService {
  public createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  protected carM = new CarModel();

  public async createNewCar(car: ICar) {
    const newCar = await this.carM.createNewCar(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const allCars = await this.carM.getAllCars();
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
}

export default CarService;