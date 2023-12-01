import { Request, Response } from "express";
import {
  IProduct,
  IProductResponse,
  emptyProduct,
} from "../../domain/models/product";
import { ProductUseCase } from "../../domain/usecases/product.usecase";
import { ProductRepository } from "../../data/repositories/impl/product.repository";
import {
  ProductImageMapper,
  ProductMapper,
  TagMapper,
} from "../mappers/mapper";
import { ProductRequestDto } from "../dtos/product-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { ProductImageRepository } from "../../data/repositories/impl/product-image.repository";
import { ProductImageUseCase } from "../../domain/usecases/product-image.usecase";
import { IProductImage } from "../../domain/models/product-image";
import { nanoid } from "nanoid";
import { ProductTag } from "../../data/entities/product-tag";
import { ITag } from "../../domain/models/tag";
import { IProductTag } from "../../domain/models/product-tag";

const productRepository = new ProductRepository();
const productUseCase = new ProductUseCase(productRepository);
const productMapper = new ProductMapper();

// product images
const productImageRepository = new ProductImageRepository();
const productImageUseCase = new ProductImageUseCase(productImageRepository);
const productImageMapper = new ProductImageMapper();

//product tags
const tagMapper = new TagMapper();

export class ProductsController {
  async createProduct(
    req: Request,
    res: Response<IProductResponse>
  ): Promise<void> {
    const dto = new ProductRequestDto(req.body);
    const validationErrors = await validate(dto);
    const { productImages } = req.files as any;

    if (!req.files) {
      throw new Error("Please select Images!");
    }

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const productResponse = await productUseCase.createProduct(
          dto.toData()
        );

        const arrObj: IProductImage[] = productImages.map((image: any) => {
          return {
            id: nanoid(10),
            imageUrl: image.filename,
            productId: `${productResponse.id}`,
            productName: dto.toData().name,
          };
        });
        const productImageResponse =
          await productImageUseCase.createProductImages(arrObj);
        const productImageDatas =
          productImageMapper.toDTOs(productImageResponse);

        // add tags to product-tags
        const tags = JSON.parse(req.body.tags);

        const arry: IProductTag[] = tags.map(async (tag: string) => {
          return {
            tagId: tag,
            productId: `${productResponse.id}`,
          };
        });

        await ProductTag.bulkCreate([...arry], {
          include: ["product"],
        });

        const tagRes = await productResponse.$get("tags");
        const tagDtos = tagMapper.toDTOs(tagRes);

        const obj: IProduct = {
          ...productResponse.toJSON<IProduct>(),
          productImages: productImageDatas,
          reviews: [],
          tags: tagDtos,
        };

        res.status(201).json({
          data: obj,
          message: "Product created Successfully!",
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
      const products = await productUseCase.getAll();
      const productsDTO = productMapper.toDTOs(products);

      // const obj = await Promise.all(productsDTO.map(async (product) => {
      //   const tags = await productUseCase.getTagsForProduct(product.id);
      //   const productImages = await productUseCase.getImagesForProduct(product.id);

      //   return {
      //     ...product,
      //     tags: tagMapper.toDTOs(tags),
      //     productImages: productImageMapper.toDTOs(productImages)
      //   };
      // }))

      res.json({
        data: productsDTO,
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

  async search(req: Request, res: Response<any>): Promise<void> {
    try {
      const searchTerm = req.query.searchTerm;
      const products = await productUseCase.search(`${searchTerm}`);
      const productsDTO = productMapper.toDTOs(products);

      res.json({
        data: productsDTO,
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

  async getProductById(
    req: Request,
    res: Response<IProductResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const product = await productUseCase.getProductById(id);
      if (!product) {
        throw new NotFoundException("Product", id);
      }
      const productDTO = productMapper.toDTO(product);
      res.json({
        data: productDTO,
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

  async getProductsByCategory(
    req: Request,
    res: Response<IProductResponse>
  ): Promise<void> {
    try {
      const categoryId = req.params.categoryId;
      const products = await productUseCase.getProductsByCategory(categoryId);
      const productsDTO = productMapper.toDTOs(products);

      res.json({
        data: productsDTO,
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

  async updateProduct(
    req: Request,
    res: Response<IProductResponse>
  ): Promise<void> {
    const dto = new ProductRequestDto(req.body);
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

        const obj: IProduct = {
          ...emptyProduct,
          ...req.body,
          id: id,
        };
        const updatedProduct = await productUseCase.updateProduct(obj);
        const productDto = productMapper.toDTO(updatedProduct);

        res.json({
          data: productDto,
          message: "Product Updated Successfully!",
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

  async deleteProduct(
    req: Request,
    res: Response<IProductResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await productUseCase.deleteProduct(id);

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
