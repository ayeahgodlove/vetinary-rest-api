import { Category } from "../../entities/category";
import { ICategory } from "../../../domain/models/category";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class CategoryRepository implements IRepository<ICategory, Category> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Category as parameter
   * @category
   * returns void
   */
  async create(category: ICategory): Promise<Category> {
    try {
      return await Category.create<Category>({ ...category });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Category
   */
  async findById(id: string): Promise<Category | null> {
    try {
      const categoryItem = await Category.findByPk(id);

      if (!categoryItem) {
        throw new NotFoundException("Category", id);
      }
      return categoryItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Category
   */
  async findByName(name: string): Promise<Category | null> {
    try {
      const categoryItem = await Category.findOne({ where: { name } });
      return categoryItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Category
   */
  async getAll(): Promise<Category[]> {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Category as parameter
   * @category
   * returns void
   */
  async update(category: ICategory): Promise<Category> {
    const { id } = category;
    try {
      const categoryItem: any = await Category.findByPk(id);

      console.log(category);
      if (!categoryItem) {
        throw new NotFoundException("Category", id.toString());
      }

      return await categoryItem.update({ ...category });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const categoryItem = await Category.findByPk(id);

      if (!categoryItem) {
        throw new NotFoundException("Category", id);
      }

      await categoryItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
