import {
  CreateRole,
  DeleteRole,
  GetRole,
  Roles,
  UpdateRole,
} from "./controllers/role.controller";
import { Router } from "express";
import {
  AuthenticatedUser,
  ChangeStatus,
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
import {
  CreatePermission,
  DeletePermission,
  GetPermission,
  Permissions,
  UpdatePermission,
} from "./controllers/permission.controller";
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  Products,
  UpdateProduct,
} from "./controllers/product.controller";
import { PermissionMiddleware } from "./middleware/permission.middleware";

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleware, AuthenticatedUser);
  router.post("/api/logout", AuthMiddleware, Logout);
  router.put("/api/users/info", AuthMiddleware, UpdateInfo);
  router.put("/api/users/password", AuthMiddleware, UpdatePassword);

  router.get(
    "/api/users",
    AuthMiddleware,
    PermissionMiddleware("users"),
    Users
  );
  router.post(
    "/api/users",
    AuthMiddleware,
    PermissionMiddleware("users"),
    CreateUser
  );
  router.get(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    GetUser
  );
  router.put(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    UpdateUser
  );
  router.delete(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    DeleteUser
  );
  //Change Status
  router.put("/api/users/:id/status", AuthMiddleware, ChangeStatus);
  // Permissions
  router.get("/api/permissions", AuthMiddleware, Permissions);
  router.post("/api/permissions", AuthMiddleware, CreatePermission);
  router.get("/api/permissions/:id", AuthMiddleware, GetPermission);
  router.delete("/api/permissions/:id", AuthMiddleware, DeletePermission);
  router.put("/api/permissions/:id", AuthMiddleware, UpdatePermission);
  // Roles
  router.get(
    "/api/roles",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    Roles
  );
  router.post(
    "/api/roles",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    CreateRole
  );
  router.get(
    "/api/roles/:id",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    GetRole
  );
  router.put(
    "/api/roles/:id",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    UpdateRole
  );
  router.delete(
    "/api/roles/:id",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    DeleteRole
  );

  //Products
  router.get(
    "/api/products",
    AuthMiddleware,
    PermissionMiddleware("products"),
    Products
  );
  router.post(
    "/api/products",
    AuthMiddleware,
    PermissionMiddleware("products"),
    CreateProduct
  );
  router.get(
    "/api/products/:id",
    AuthMiddleware,
    PermissionMiddleware("products"),
    GetProduct
  );
  router.put(
    "/api/products/:id",
    AuthMiddleware,
    PermissionMiddleware("products"),
    UpdateProduct
  );
  router.delete(
    "/api/products/:id",
    AuthMiddleware,
    PermissionMiddleware("products"),
    DeleteProduct
  );
};
