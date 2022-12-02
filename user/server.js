const express = require("express");
const userController = require("./controllers/userController");

const app = express();

app.use(express.json());

app.get("/users", userController.read);
app.post("/post", userController.create);
app.put("/post/:id", userController.updateById);
app.get("/users/:id", userController.readById);
app.delete("/users/:id", userController.deleteById);

app.listen(1000, () => {
  console.log("server is running on http://localhost:1000");
});
