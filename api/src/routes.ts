import { CreateRole, GetRole, Roles } from "./controllers/role.controller";
import { Router } from "express";
import {
  AuthenticatedUser,
  Login,
  Logout,
  Register,
  UpdateInfo,
  UpdatePassword,
} from "./controllers/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import {
  Users,
  CreateUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "./controllers/user.controller";
import { Permissions } from "./controllers/permission.controller";

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleware, AuthenticatedUser);
  router.post("/api/logout", AuthMiddleware, Logout);
  router.put("/api/users/info", AuthMiddleware, UpdateInfo);
  router.put("/api/users/password", AuthMiddleware, UpdatePassword);
  router.get("/api/users", AuthMiddleware, Users);
  router.post("/api/users", AuthMiddleware, CreateUser);
  router.get("/api/users/:id", AuthMiddleware, GetUser);
  router.put("/api/users/:id", AuthMiddleware, UpdateUser);
  router.delete("/api/users/:id", AuthMiddleware, DeleteUser);
  // Permissions
  router.get("/api/permissions", AuthMiddleware, Permissions);
  // Roles
  router.get("/api/roles", AuthMiddleware, Roles);
  router.post("/api/roles", AuthMiddleware, CreateRole);
  router.get("/api/roles/:id", AuthMiddleware, GetRole);
};
