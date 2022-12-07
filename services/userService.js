const UserRepository = require("../repositories/userRepository");

class UserService {
  static async getUserData() {
    try {
      const getUser = await UserRepository.getUserData();
      return {
        status: true,
        status_code: 200,
        message: "success",
        data: {
          posts: getUser,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async postUserData({ name, email, password, role }) {
    try {
      if (!name || !email || !password || !role) {
        return {
          status: false,
          statusCode: 400,
          message: "Failed to insert new user to database",
          data: {
            registered_user: null,
          },
        };
      } else {
        const createdPost = await UserRepository.postUserData({
          name,
          email,
          password,
          role,
        });
        return {
          status: true,
          statusCode: 200,
          message: "success",
          data: {
            created_posts: createdPost,
          },
        };
      }
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
  static async getUserById({ id }) {
    try {
      const getUser = await UserRepository.getUserById({ id });

      return {
        status: true,
        statusCode: 200,
        message: "success",
        data: {
          posts: getUser,
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
  static async updateUserById({ id, name, email, password, role }) {
    try {
      const user = await UserRepository.getUserById({ id });

      if (!user) {
        return {
          status: false,
          statusCode: 404,
          message: "User not found!",
          data: {
            registered_user: null,
          },
        };
      }
      if (!name || !email || !password || !role) {
        return {
          status: false,
          statusCode: 400,
          message: "Failed to insert new user to database",
          data: {
            registered_user: null,
          },
        };
      }

      const getUpdate = await UserRepository.updateUserById({ id });

      return {
        status: true,
        statusCode: 201,
        message: "success updating data!",
        data: {
          posts: getUpdate,
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
  static async deleteUserById({ id }) {
    try {
      const user = await UserRepository.getUserById({ id });

      if (!user) {
        return {
          status: false,
          statusCode: 404,
          message: "User not found!",
          data: {
            registered_user: null,
          },
        };
      }

      const getDeleted = await UserRepository.deleteUserById({ id });

      return {
        status: true,
        statusCode: 200,
        message: "success deleting data!",
        data: {
          posts: getDeleted,
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

module.exports = UserService;
