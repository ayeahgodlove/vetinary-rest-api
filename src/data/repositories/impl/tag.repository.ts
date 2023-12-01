import { Tag } from "../../entities/tag";
import { ITag } from "../../../domain/models/tag";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class TagRepository implements IRepository<ITag, Tag> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Tag as parameter
   * @tag
   * returns void
   */
  async create(tag: ITag): Promise<Tag> {
    try {
      return await Tag.create<Tag>({ ...tag });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Tag
   */
  async findById(id: string): Promise<Tag | null> {
    try {
      const tagItem = await Tag.findByPk(id);

      if (!tagItem) {
        throw new NotFoundException("Tag", id);
      }
      return tagItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Tag
   */
  async findByName(name: string): Promise<Tag | null> {
    try {
      const tagItem = await Tag.findOne({ where: { name } });
      return tagItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Tag
   */
  async getAll(): Promise<Tag[]> {
    try {
      const tags = await Tag.findAll();
      return tags;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Tag as parameter
   * @tag
   * returns void
   */
  async update(tag: ITag): Promise<Tag> {
    const { id } = tag;
    try {
      const tagItem: any = await Tag.findByPk(id);

      console.log(tag);
      if (!tagItem) {
        throw new NotFoundException("Tag", id.toString());
      }

      return await tagItem.update({ ...tag });
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
      const tagItem = await Tag.findByPk(id);

      if (!tagItem) {
        throw new NotFoundException("Tag", id);
      }

      await tagItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
