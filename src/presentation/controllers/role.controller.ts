import { Request, Response } from "express";
import {
  IRole,
  IRoleResponse,
  emptyRole,
} from "../../domain/models/role";
import { RoleUseCase } from "../../domain/usecases/role.usecase";
import { RoleRepository } from "../../data/repositories/impl/role.repository";
import { RoleMapper } from "../mappers/mapper";
import { RoleRequestDto } from "../dtos/role-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const roleRepository = new RoleRepository();
const roleUseCase = new RoleUseCase(roleRepository);
const roleMapper = new RoleMapper();

export class RolesController {
  async createRole(
    req: Request,
    res: Response<IRoleResponse>
  ): Promise<void> {
    const dto = new RoleRequestDto(req.body);
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
        const roleResponse = await roleUseCase.createRole(
          dto.toData()
        );

        res.status(201).json({
          data: roleResponse.toJSON<IRole>(),
          message: "Role created Successfully!",
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
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const roles = await roleUseCase.getAll();
      const rolesDTO = roleMapper.toDTOs(roles);

      res.json({
        data: rolesDTO,
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

  async getRoleById(
    req: Request,
    res: Response<IRoleResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const role = await roleUseCase.getRoleById(id);
      if (!role) {
        throw new NotFoundException("Role", id);
      }
      const roleDTO = roleMapper.toDTO(role);
      res.json({
        data: roleDTO,
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

  async updateRole(
    req: Request,
    res: Response<IRoleResponse>
  ): Promise<void> {
    const dto = new RoleRequestDto(req.body);
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

        const obj: IRole = {
          ...emptyRole,
          ...req.body,
          id: id,
        };
        const updatedRole = await roleUseCase.updateRole(obj);
        const roleDto = roleMapper.toDTO(updatedRole);

        res.json({
          data: roleDto,
          message: "Role Updated Successfully!",
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

  async deleteRole(
    req: Request,
    res: Response<IRoleResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await roleUseCase.deleteRole(id);

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
}
