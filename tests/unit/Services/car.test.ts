import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/car.service';
import ICar from '../../../src/Interfaces/ICar';

const carInfo: ICar = {
  id: '49',
  model: 'Giorno Giovanna',
  year: 2001,
  color: 'Gold',
  status: true,
  buyValue: 77.777,
  doorsQty: 5,
  seatsQty: 5,
};

const updatedCar: ICar = {
  id: '14',
  model: 'Jolyne Cujoh',
  year: 2012,
  color: 'Green',
  status: true,
  buyValue: 19.174,
  doorsQty: 6,
  seatsQty: 5,
};

const newCar: Car = new Car(carInfo);
const service = new CarService();

describe('Testes da camada Service - Car', function () {
  it('Verifica se é possível criar um novo carro', async function () {
    sinon.stub(Model, 'create').resolves(newCar);

    const car = await service.createNewCar(carInfo);

    expect(car).to.be.deep.equal(newCar);
  });

  it('Verifica se é possível retornar um array com todos os carros do banco', async function () {
    sinon.stub(Model, 'find').resolves([newCar]);

    const allCars = await service.getAllCars();

    expect(allCars).to.be.deep.equal([newCar]);
  });

  it('Verifica se é possível retornar um único carro através do seu id', async function () {
    sinon.stub(Model, 'findOne').resolves(newCar);

    const singleCar = await service.getById('49');

    expect(singleCar).to.be.deep.equal(newCar);
  });

  it('Verifica se é possível atualizar os dados de um carro através de seu id', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(updatedCar);

    const updated = await service.updateCar('49', carInfo);

    expect(updated).to.be.deep.equal(updatedCar);
  });
});