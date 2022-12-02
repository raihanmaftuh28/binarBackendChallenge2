const userService = require("../services/userService");

const read = async (req, res) => {
  const { status, statusCode, message, data } = await userService.getUserData();

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  const { status, statusCode, message, data } = await userService.postUserData({
    name,
    email,
    password,
    role,
  });

  res.status(statusCode).json({ status, message, data });
};

const readById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } = await userService.getUserById({
    id,
  });
  res.status(statusCode).json({ status, message, data });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const { status, statusCode, message, data } =
    await userService.updateUserById({
      id,
      name,
      email,
      password,
      role,
    });
  res.status(statusCode).json({ status, message, data });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await userService.deleteUserById({
      id,
    });
  res.status(statusCode).json({ status, message, data });
};

module.exports = { read, create, readById, updateById, deleteById };
