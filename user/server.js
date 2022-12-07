const express = require("express");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const carController = require("./controllers/carController");
const middleware = require("./middlewares/auth");
const upload = require("./cloudHandler/fileUpload");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-api.json");

const app = express();

app.use(express.json());

// user authentication/register
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currentUser);
app.put(
  "/auth/changeRole",
  middleware.authenticate,
  middleware.isSuperAdmin,
  authController.changeRole
);

// Car
app.post(
  "/car",
  upload.single("image"),
  middleware.authenticate,
  middleware.isAdminOrSuperAdmin,
  carController.create
);
app.put(
  "/car/:id",
  middleware.authenticate,
  middleware.isAdminOrSuperAdmin,
  carController.updateById
);
app.get("/car", middleware.authenticate, carController.read);
app.get("/car/:id", middleware.authenticate, carController.readById);
app.delete(
  "/car/:id",
  middleware.authenticate,
  middleware.isAdminOrSuperAdmin,
  carController.deleteById
);

// user manipulation
app.get("/users", userController.read);
app.post("/post", userController.create);
app.put("/post/:id", userController.updateById);
app.get("/users/:id", userController.readById);
app.delete("/users/:id", userController.deleteById);

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(1000, () => {
  console.log("server is running on http://localhost:1000");
});
