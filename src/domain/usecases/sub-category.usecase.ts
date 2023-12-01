import { SubCategory } from "../../data/entities/sub-category";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { ISubCategory } from "../models/sub-category";
import slugify from "slugify";
export class SubCategoryUseCase {
  /**
   *
   */
  constructor(
    private readonly subCategoryRepository: IRepository<ISubCategory, SubCategory>
  ) {}

  async createSubCategory(category: ISubCategory): Promise<SubCategory> {
    const existingSubCategory = await this.subCategoryRepository.findByName(
      category.name
    );

    if (existingSubCategory) {
      throw new Error("SubCategory already exists");
    }

    // const _category = new SubCategory({category});
    //because it's already done in the Repository
    return this.subCategoryRepository.create(category);
  }

  async getAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.getAll();
  }

  async getSubCategoryById(id: string): Promise<SubCategory | null> {
    return this.subCategoryRepository.findById(id);
  }

  async updateSubCategory(category: ISubCategory): Promise<SubCategory> {
    const { id, name, description } = category;
    const obj: ISubCategory = {
      id,
      name,
      slug: slugify(name, { lower: true, replacement: "-" }),
      description,
    };
    return this.subCategoryRepository.update(obj);
  }

  async deleteSubCategory(id: string): Promise<void> {
    return this.subCategoryRepository.delete(id);
  }
}
