import { Request, Response } from "express";
import { IUser, IUserResponse, emptyUser } from "../../domain/models/user";
import { UserUseCase } from "../../domain/usecases/user.usecase";
import { UserRepository } from "../../data/repositories/impl/user.repository";
import { RoleMapper, UserMapper } from "../mappers/mapper";
import { UserRequestDto } from "../dtos/user-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { User } from "../../data/entities/user";
import { Role } from "../../data/entities/role";
import { RoleRepository } from "../../data/repositories/impl/role.repository";
import { RoleUseCase } from "../../domain/usecases/role.usecase";
import { RoleRequestDto } from "../dtos/role-request.dto";
import { emptyRole } from "../../domain/models/role";
import jwt from "jsonwebtoken";
import { SECRET_KEY, header } from "../../shared/middlewares/authz.middleware";
import { sendRegistrationMail } from "../../utils/email";
import HttpException from "../../shared/middlewares/http-exception";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userUseCase = new UserUseCase(userRepository);
const roleUseCase = new RoleUseCase(roleRepository);
const userMapper = new UserMapper();
const roleMapper = new RoleMapper();

export class UsersController {
  async createUser(
    req: Request,
    res: Response<IUserResponse>,
    next: any
  ): Promise<void> {
    const { userRole } = req.body;
    const roleDto = new RoleRequestDto({
      ...emptyRole,
      name: userRole,
    });
    const dto = new UserRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const userResponse = await userUseCase.createUser(dto.toData());
        const [response, bool] = await Role.findOrCreate({
          where: { id: roleDto.toData().id, name: roleDto.toData().name },
        });
        // const roleRespone = await roleUseCase.createRole(roleDto.toData());

        // Associate roles with the user
        await userResponse.$add("roles", [response]);

        // Retrieve user roles
        const userRoles = await userResponse.$get("roles");
        const rolesDTO = roleMapper.toDTOs(userRoles);

        const user: IUser = {
          ...userResponse.toJSON<IUser>(),
          roles: rolesDTO,
        };

        const activationToken = createActivationToken(user);
        const activationUrl = `${process.env.APP_URL}/activation/${activationToken}`;

        await sendRegistrationMail(user.email, activationUrl);
        res.status(201).json({
          data: {
            ...user,
            token: activationToken,
          },
          message: `User created Successfully!, Please check your email:- ${user.email} to activate your account: ${activationUrl}`,
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
        return next(new HttpException(500, error.message, error));
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const users = await userUseCase.getAll();
      const usersDTO = userMapper.toDTOs(users);

      res.json({
        data: usersDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateUser(req: Request, res: Response<IUserResponse>): Promise<void> {
    const dto = new UserRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IUser = {
          ...emptyUser,
          ...req.body,
          id: id,
        };
        const updatedUser = await userUseCase.updateUser(obj);
        const userDto = userMapper.toDTO(updatedUser);

        res.json({
          data: userDto,
          message: "User Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteUser(req: Request, res: Response<IUserResponse>): Promise<void> {
    try {
      const id = req.params.id;

      await userUseCase.deleteUser(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }

  async uploadAvatar(req: Request, res: Response<any>): Promise<void> {
    const user = req.user as User;
    const { filename } = req.file as Express.Multer.File;

    try {
      await userUseCase.updateAvatar(user.id, filename);

      res.json({
        message: "User Avatar uploaded Successfully!",
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }

  // Add a role to a user
  async addUserRole(req: Request, res: Response<any>): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const roleId = Number(req.params.roleId);

      // Find the user and role using their IDs
      const user = await User.findByPk(userId);
      const role = await Role.findByPk(roleId);

      if (!user || !role) {
        res
          .status(404)
          .json({ message: "User or role not found", success: false });
        return;
      }
      // Add the role to the user using Sequelize association methods
      await user.$add("role", role);

      res.status(200).json({
        message: "Role added to the user successfully",
        success: true,
        validationErrors: [],
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async activateUser(
    req: Request,
    res: Response<any>,
    next: any
  ): Promise<void> {
    try {
      const { activationToken } = req.body;

      const newUser: any = jwt.verify(activationToken, SECRET_KEY, {
        algorithms: ["HS256"],
      });
      if (!newUser) {
        return next(new HttpException(400, "Invalid token"));
      }
      const user = await User.findOne({ where: { email: newUser.email } });
      if (!user) {
        return next(
          new HttpException(400, "Something went wrong: user doesn't exist")
        );
      }
      const userResponse = await user.update({ verified: true });
      // Retrieve user roles
      const userRoles = await userResponse.$get("roles");
      const rolesDTO = roleMapper.toDTOs(userRoles);
      const userEntity: IUser = {
        ...userResponse.toJSON<IUser>(),
        roles: rolesDTO,
      };

      const token = jwt.sign(userEntity, SECRET_KEY, {
        expiresIn: 86400,
        header,
      });

      res.status(200).json({
        success: true,
        message: "Your account has been Activated Successfully!",
        data: {
          ...userEntity,
          token,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  }
}

function createActivationToken(user: IUser) {
  const token = jwt.sign(user, SECRET_KEY, {
    expiresIn: 86400,
    header,
  });
  return token;
}
