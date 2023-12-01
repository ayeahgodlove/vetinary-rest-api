// src/infrastructure/routes/role-routes.ts
import { Router } from "express";
import { RolesController } from "../controllers/role.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const roleController = new RolesController();

const roleRouter = Router();

roleRouter.get("", roleController.getAll);
roleRouter.get("/:id", roleController.getRoleById);
roleRouter.post("", isAuthenticatedMiddleware, roleController.createRole);
roleRouter.put("/:id", isAuthenticatedMiddleware, roleController.updateRole);
roleRouter.delete("/:id", isAuthenticatedMiddleware, roleController.deleteRole);

export default roleRouter;
