const { User } = require("../models");

class UserRepository {
  static async getUserById({ id }) {
    const getPost = await User.findOne({ where: { id } });
    return getPost;
  }

  static async getUserData() {
    const getUser = await User.findAll();
    return getUser;
  }

  static async postUserData({ name, email, password, role }) {
    const userCreated = await User.create({ name, email, password, role });
    console.log(userCreated);
    return userCreated;
  }

  static async updateUserById({ id, name, email, password, role }) {
    const userUpdated = await User.update(
      { name, email, password, role },
      { where: { id } }
    );
    return userUpdated;
  }

  static async deleteUserById({ id }) {
    const userDeleted = await User.destroy({ where: { id } });
    return userDeleted;
  }
}

module.exports = UserRepository;
