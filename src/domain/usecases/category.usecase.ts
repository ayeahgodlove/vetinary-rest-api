import { Category } from "../../data/entities/category";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { ICategory } from "../models/category";
import slugify from "slugify";
export class CategoryUseCase {
  /**
   *
   */
  constructor(private readonly categoryRepository: IRepository<ICategory, Category>) {}

  async createCategory(category: ICategory): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(
      category.name
    );

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    // const _category = new Category({category});
    //because it's already done in the Repository
    return this.categoryRepository.create(category);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async updateCategory(category: ICategory): Promise<Category> {
    const { id, name, description } = category;
    const obj: ICategory = {
      id,
      name,
      slug: slugify(name, { lower: true, replacement: "-" }),
      description,
    };
    return this.categoryRepository.update(obj);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.categoryRepository.delete(id);
  }
}