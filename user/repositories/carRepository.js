const { Car } = require("../models");

class CarRepository {
  static async getCarData() {
    const carGot = await Car.findAll();
    return carGot;
  }

  static async postCarData({ name, price, size, image, createdBy }) {
    console.log("in");
    const carGot = await Car.create({ name, price, size, image, createdBy });
    return carGot;
  }

  static async getCarById({ id }) {
    const carGot = await Car.findOne({ where: { id } });
    return carGot;
  }

  static async updateCarById({ id, name, price, size, updatedBy }) {
    const carUpdated = await Car.update(
      { name, price, size, updatedBy },
      { where: { id } }
    );

    return carUpdated;
  }

  static async deleteCarById({ id, deletedBy, deletedAt }) {
    const carDeleted = await Car.update(
      { deletedBy, deletedAt },
      { where: { id } }
    );

    return carDeleted;
  }
}

module.exports = CarRepository;
