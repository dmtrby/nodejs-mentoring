import { router } from "./routes/routes";
import {
  createUserController,
  getUserController,
  getUsersController,
  getUserHobbiesController,
  deleteUserController,
  updateUserHobbyController,
  updateUserController,
  mainController,
} from "./controllers";
import { PORT, REST_VALUES } from "./constants";

const app = router();

app.addRoute(REST_VALUES.get, "/", mainController);
app.addRoute(REST_VALUES.get, "/users", getUsersController);
app.addRoute(REST_VALUES.post, "/users", createUserController);
app.addRoute(REST_VALUES.get, "/users/:id", getUserController);
app.addRoute(REST_VALUES.patch, "/users/:id", updateUserController);
app.addRoute(REST_VALUES.delete, "/users/:id", deleteUserController);
app.addRoute(REST_VALUES.get, "/users/:id/hobbies", getUserHobbiesController);
app.addRoute(
  REST_VALUES.patch,
  "/users/:id/hobbies",
  updateUserHobbyController
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
