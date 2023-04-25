import IMotorcycle from '../Interfaces/IMotorcycle';
import Veicolo from './Vehicle';

class Motorcycle extends Veicolo {
  private category: 'Custom' | 'Street' | 'Trail';
  private engineCapacity: number;

  constructor(moto: IMotorcycle) {
    super(moto);
    this.id = moto.id;
    this.model = moto.model;
    this.year = moto.year;
    this.color = moto.color;
    this.status = moto.status || false;
    this.buyValue = moto.buyValue;
    this.category = moto.category;
    this.engineCapacity = moto.engineCapacity;
  }
}

export default Motorcycle;