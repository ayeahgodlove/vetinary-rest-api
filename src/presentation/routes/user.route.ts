// src/infrastructure/routes/user-routes.ts
import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import { multerInstance } from "../../shared/helper/multer.config";

const userController = new UsersController();

const userRouter = Router();

userRouter.get("",userController.getAll);
userRouter.get("/me", isAuthenticatedMiddleware, (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Success",
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failure!",
      success: false,
      errors: error.message,
    });
  }
});
userRouter.post("", userController.createUser);
userRouter.put('/activation', userController.activateUser);
userRouter.put("/:id", isAuthenticatedMiddleware, userController.updateUser);
userRouter.delete("/:id", isAuthenticatedMiddleware, userController.deleteUser);
// upload user avatar image
userRouter.post(
  "/upload",
  isAuthenticatedMiddleware,
  multerInstance.single("avatar"),
  userController.uploadAvatar
);
userRouter.post('/:userId/roles/:roleId', isAuthenticatedMiddleware, userController.addUserRole);
export default userRouter;
