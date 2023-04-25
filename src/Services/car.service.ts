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

  public async createNewCar(car: ICar) {
    const carM = new CarModel();
    const newCar = await carM.createNewCar(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;
