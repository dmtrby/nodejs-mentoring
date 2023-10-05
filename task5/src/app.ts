import { router } from "./routes/routes";
import {
  userHobbyController,
  mainController,
  userController,
} from "./controllers";
import { PORT, REST_VALUES } from "./constants";

const app = router();

app.addRoute(REST_VALUES.get, "/", mainController);
app.addRoute(REST_VALUES.get, "/users", userController.getAllUsers);
app.addRoute(REST_VALUES.post, "/users", userController.createOneUser);
app.addRoute(REST_VALUES.get, "/users/:id", userController.getOneUser);
app.addRoute(REST_VALUES.patch, "/users/:id", userController.updateOneUser);
app.addRoute(REST_VALUES.delete, "/users/:id", userController.deleteOneUser);
app.addRoute(
  REST_VALUES.get,
  "/users/:id/hobbies",
  userHobbyController.getUserHobbies
);
app.addRoute(
  REST_VALUES.patch,
  "/users/:id/hobbies",
  userHobbyController.updateUserHobbies
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
