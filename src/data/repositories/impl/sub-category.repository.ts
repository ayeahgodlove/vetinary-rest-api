import { SubCategory } from "../../entities/sub-category";
import { ISubCategory } from "../../../domain/models/sub-category";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class SubCategoryRepository implements IRepository<ISubCategory, SubCategory> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a SubCategory as parameter
   * @Subcategory
   * returns void
   */
  async create(Subcategory: ISubCategory): Promise<SubCategory> {
    try {
      return await SubCategory.create<SubCategory>({ ...Subcategory });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns SubCategory
   */
  async findById(id: string): Promise<SubCategory | null> {
    try {
      const subcategoryItem = await SubCategory.findByPk(id);

      if (!subcategoryItem) {
        throw new NotFoundException("SubCategory", id);
      }
      return subcategoryItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns SubCategory
   */
  async findByName(name: string): Promise<SubCategory | null> {
    try {
      const subcategoryItem = await SubCategory.findOne({ where: { name } });
      return subcategoryItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of SubCategory
   */
  async getAll(): Promise<SubCategory[]> {
    try {
      const subCategories = await SubCategory.findAll();
      return subCategories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a SubCategory as parameter
   * @Subcategory
   * returns void
   */
  async update(Subcategory: ISubCategory): Promise<SubCategory> {
    const { id } = Subcategory;
    try {
      const subcategoryItem: any = await SubCategory.findByPk(id);

      if (!subcategoryItem) {
        throw new NotFoundException("SubCategory", id.toString());
      }

      return await subcategoryItem.update({ ...Subcategory });
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
      const subcategoryItem = await SubCategory.findByPk(id);

      if (!subcategoryItem) {
        throw new NotFoundException("SubCategory", id);
      }

      await subcategoryItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
