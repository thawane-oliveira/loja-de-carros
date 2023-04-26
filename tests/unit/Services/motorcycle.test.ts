import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/motorcycle.service';

const motorcycleInfo: IMotorcycle = {
  id: '49',
  model: 'Pannacotta Fugo',
  year: 2001,
  color: 'Purple',
  status: true,
  buyValue: 49.147,
  category: 'Street',
  engineCapacity: 700,
};

const updatedMotorcycle: IMotorcycle = {
  id: '49',
  model: 'Noriaki Kakyoin',
  year: 1987,
  color: 'Green',
  status: true,
  buyValue: 65.178,
  category: 'Trail',
  engineCapacity: 400,
};

const invalidMotorcycle: IMotorcycle = {
  model: 'Risotto Nero',
  year: 2001,
  color: 'Black',
  status: true,
  buyValue: 90.202,
  category: 'Custom',
  engineCapacity: 900,
};

const newMotorcycle: Motorcycle = new Motorcycle(motorcycleInfo);
const service = new MotorcycleService();

describe('Testes da camada Service - Motorcycle', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Verifica se é possível criar uma nova moto', async function () {
    sinon.stub(Model, 'create').resolves(newMotorcycle);

    const motorcycle = await service.createNewMotorcycle(motorcycleInfo);

    expect(motorcycle).to.be.deep.equal(newMotorcycle);
  });

  it('Verifica se é possível retornar um array com todas as motos do banco', async function () {
    sinon.stub(Model, 'find').resolves([newMotorcycle]);

    const allMotorcycles = await service.getAll();

    expect(allMotorcycles).to.be.deep.equal([newMotorcycle]);
  });

  it('Verifica se é possível retornar uma única moto através do seu id', async function () {
    sinon.stub(Model, 'findOne').resolves(newMotorcycle);

    const singleMotorcycle = await service.getById('49');

    expect(singleMotorcycle).to.be.deep.equal(newMotorcycle);
  });

  it('Verifica se é possível atualizar os dados de uma moto através de seu id', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(updatedMotorcycle);

    const updated = await service.update('49', motorcycleInfo);

    expect(updated).to.be.deep.equal(updatedMotorcycle);
  });

  it('Verifica se não retorna uma moto caso o id seja inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const singleMotorcycle = await service.getById('99999');

    expect(singleMotorcycle).to.be.deep.equal(null);
  });

  it('Verifica se não atualiza um carro em caso de id inválido', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    const notUpdatedMotorcycle = await service.update('77777', invalidMotorcycle);

    expect(notUpdatedMotorcycle).to.be.deep.equal(null);
  });

  it('Verifica se é possível deletar uma moto', async function () {
    sinon.stub(Model, 'create').resolves(newMotorcycle);

    const motorcycle = await service.createNewMotorcycle(motorcycleInfo);

    expect(motorcycle).to.be.deep.equal(newMotorcycle);

    sinon.stub(Model, 'findOne').resolves(newMotorcycle);
    sinon.stub(Model, 'findOneAndDelete').resolves(null);

    const deletedMotorcycle = await service.delete('49');

    expect(deletedMotorcycle).to.be.deep.equal(undefined);
  });
});