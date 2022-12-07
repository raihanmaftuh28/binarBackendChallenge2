const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const { JWT } = require("../lib/const");
const UserRepository = require("../repositories/userRepository");

const SALT_ROUND = 10;

class AuthService {
  static async register({ name, email, password }) {
    try {
      //payload validation
      const role = "member";
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "password minimal 8 karakter",
          data: {
            registered_user: null,
          },
        };
      }

      const getUserByEmail = await userRepository.getUserByEmail({ email });

      if (getUserByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email sudah digunakan!",
          data: {
            registered_user: null,
          },
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const createdUser = await userRepository.postUserData({
          name,
          email,
          password: hashedPassword,
          role,
        });
        return {
          status: true,
          status_code: 201,
          message: "Berhasil mendaftarkan user",
          data: {
            registered_user: createdUser,
          },
        };
      }
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

  static async login({ email, password }) {
    try {
      // Payload Validation
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "email wajib diisi",
          data: {
            registered_user: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password wajib diisi",
          data: {
            registered_user: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "password minimal 8 karakter",
          data: {
            registered_user: null,
          },
        };
      }

      const getUser = await userRepository.getUserByEmail({ email });
      if (!getUser.password) {
        return {
          status: false,
          status_code: 400,
          message: "Akun ini belum melakukan setup password",
          data: {
            registered_user: null,
          },
        };
      }
      if (!getUser) {
        return {
          status: false,
          status_code: 400,
          message: "email belum terdaftar",
          data: {
            registered_user: null,
          },
        };
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          getUser.password
        );
        if (isPasswordMatch) {
          const token = jwt.sign(
            { id: getUser.id, email: getUser.email },
            JWT.SECRET,
            { expiresIn: JWT.EXPIRED }
          );
          return {
            status: true,
            status_code: 200,
            message: "User berhasil login",
            data: {
              token,
            },
          };
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Password salah",
            data: {
              registered_user: null,
            },
          };
        }
      }
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

  static async loginGoogle({ google_credential: googleCredential }) {
    try {
      // Get google user credential
      const client = newOAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const userInfo = await client.verifyIdToken({
        idToken: googleCredential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = userInfo.payload;

      const getUserByEmail = await userRepository.getUserByEmail({ email });

      if (!getUserByEmail) {
        await userRepository.create({ name, email, role: "user" });
      }

      const token = jwt.sign(
        {
          id: getUserByEmail.id,
          email: getUserByEmail.email,
        },
        JWT.SECRET,
        {
          expiresIn: JWT.EXPIRED,
        }
      );
      return {
        status: true,
        status_code: 200,
        message: "User berhasil login",
        data: {
          token,
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

  static async changeRole({ email, role }) {
    try {
      const user = await UserRepository.getUserByEmail({ email });

      if (!user) {
        return {
          status: false,
          status_code: 400,
          message: "email belum terdaftar",
          data: {
            registered_user: null,
          },
        };
      }

      const userRoleUpdated = await UserRepository.updateRole({ email, role });

      return {
        status: true,
        status_code: 200,
        message: "role berhasil diupdate",
        data: {
          registered_user: userRoleUpdated,
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
}

module.exports = AuthService;
