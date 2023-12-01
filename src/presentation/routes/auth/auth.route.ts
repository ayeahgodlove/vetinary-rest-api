// src/infrastructure/routes/category-routes.ts
import { Router } from "express";
import { IUser } from "../../../domain/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../data/entities/user";
import { RoleMapper } from "../../mappers/mapper";
import { SECRET_KEY, header } from "../../../shared/middlewares/authz.middleware";

const roleMapper = new RoleMapper();
const authRoutes = Router();

authRoutes.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    const userRoles = await user.$get("roles");
    const rolesDTO = roleMapper.toDTOs(userRoles);
    const userEntity: IUser = {
      ...user.toJSON<IUser>(),
      roles: rolesDTO,
    };

    const hashedPassword = await bcrypt.compare(
      password,
      `${userEntity.password}`
    );
    if (!hashedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(userEntity, SECRET_KEY, {
      expiresIn: 86400,
      header
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    
    res.status(200).json({
      success: true,
      message: "Login Successfully!",
      data: {
        ...userEntity,
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Login Failed" + error.message,
      data: error,
    });
  }
});

export { authRoutes };
