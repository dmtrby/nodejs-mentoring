import { userStorage } from "../database/users.storage";
import { User, NewUser } from "../models/user.model";

export const addUser = (user: NewUser) => {
  const newId = Date.now();
  userStorage.push({ ...user, id: newId });
  return true;
};

export const deleteUser = (id: number) => {
  const index = userStorage.findIndex((user) => user.id === id);
  if (index === -1) return false;
  userStorage.splice(index, 1);
  return true;
};

export const getUsers = () => {
  return userStorage;
};

export const getUser = (id: number) => {
  const user = userStorage.find((user) => user.id === id);
  return user;
};

export const addOrRemoveHobby = (id: number, newHobby: string) => {
  const user = userStorage.find((user) => user.id === id);
  if (!user) return false;
  const index = user.hobbies.findIndex((hobby) => hobby === newHobby);
  if (index !== -1) {
    user.hobbies.splice(index, 1);
  } else {
    user.hobbies.push(newHobby);
  }
  return true;
};

export const updateUser = (id: number, newUserData: User) => {
  let wasChanged = false;
  userStorage.forEach((user, index) => {
    if (user.id === id) {
      userStorage[index] = { ...user, ...newUserData };
      wasChanged = true;
    }
  });
  return wasChanged;
};
