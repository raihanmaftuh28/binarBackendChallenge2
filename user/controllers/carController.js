const carService = require("../services/carService");

const read = async (req, res) => {
  const { status, statusCode, message, data } = await carService.getCarData();

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const create = async (req, res) => {
  const { name, price, size } = req.body;
  console.log("name", name);
  const createdBy = req.user;
  const image = req.file;

  const { status, statusCode, message, data } = await carService.postCarData({
    name,
    price,
    size,
    image,
    createdBy,
  });

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const readById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } = await carService.getCarById({
    id,
  });

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, price, size } = req.body;
  const updatedBy = req.user;

  const { status, statusCode, message, data } = await carService.updateCarById(
    id,
    name,
    price,
    size,
    updatedBy
  );

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedBy = req.user;
  const deletedAt = new Date(Date.now()).toISOString();

  const { status, statusCode, message, data } = await carService.deleteCarById({
    id,
    deletedBy,
    deletedAt,
  });

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports = { read, create, readById, updateById, deleteById };
