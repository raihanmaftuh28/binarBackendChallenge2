const CarRepository = require("../repositories/carRepository.js");
const cloudinary = require("../cloudHandler/cloudinary");
const upload = require("../cloudHandler/fileUpload");

class CarService {
  static async getCarData() {
    try {
      const getCar = await CarRepository.getCarData();
      return {
        status: true,
        statusCode: 200,
        message: "success",
        data: {
          car: getCar,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          car: null,
        },
      };
    }
  }

  static async postCarData({ name, price, size, image, createdBy }) {
    try {
      if (!name || !price || !size) {
        return {
          status: false,
          statusCode: 400,
          message: "Failed to insert new user to database",
          data: {
            car: null,
          },
        };
      }
      const fileBase64 = image.buffer.toString("base64");
      const file = `data:${image.mimetype};base64,${fileBase64}`;
      // cloudinary.uploader.upload(file, (err, result) => {
      //   if (err) {
      //     return {
      //       status: false,
      //       statusCode: 400,
      //       message: `Failed to upload image: ${err.message}`,
      //       data: {
      //         image: null,
      //       },
      //     };
      //   }
      //   const carPosted = CarRepository.postCarData({
      //     name,
      //     price,
      //     size,
      //     image,
      //     createdBy,
      //   });
      // });

      const result = await cloudinary.uploader.upload(file);
      console.log(result.url);
      console.log("createdBy", createdBy.email);
      const carPosted = await CarRepository.postCarData({
        name,
        price,
        size,
        image: result.url,
        createdBy: createdBy.name,
      });
      console.log("car", carPosted);
      return {
        status: true,
        statusCode: 200,
        message: "success adding car",
        data: {
          car: carPosted,
        },
      };
    } catch (err) {}
  }

  static async getCarById({ id }) {
    try {
      const getCar = await CarRepository.getCarById({ id });

      return {
        status: true,
        statusCode: 200,
        message: "success",
        data: {
          car: getCar,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          car: null,
        },
      };
    }
  }

  static async updateCarById({ id, name, price, size, updatedBy }) {
    try {
      const car = await CarRepository.getCarById({ id });

      if (!car) {
        return {
          status: false,
          statusCode: 404,
          message: "car not found!",
          data: {
            car: null,
          },
        };
      }
      if (!name || !price || !size) {
        return {
          status: false,
          statusCode: 404,
          message: "failed to update, some credential missing!",
          data: {
            car: null,
          },
        };
      }

      const carUpdated = await CarRepository.updateCarById({
        id,
        name,
        price,
        size,
        updatedBy: updatedBy.name,
      });
      return {
        status: true,
        statusCode: 201,
        message: "success updating data!",
        data: {
          car: carUpdated,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async deleteCarById({ id, deletedBy, deletedAt }) {
    try {
      const car = await CarRepository.getCarById({ id });

      if (!car) {
        return {
          status: false,
          statusCode: 404,
          message: "car not found!",
          data: {
            car: null,
          },
        };
      }

      const carUpdated = await CarRepository.deleteCarById({
        id,
        deletedBy: deletedBy.name,
        deletedAt,
      });
      return {
        status: true,
        statusCode: 200,
        message: "success deleting data!",
        data: {
          car: carUpdated,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = CarService;
