import { UserDoc } from "../../entities/user-doc";
import { IUserDoc } from "../../../domain/models/user-doc";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class UserDocRepository implements IRepository<IUserDoc, UserDoc> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a UserDoc as parameter
   * @userDoc
   * returns void
   */
  async create(userDoc: IUserDoc): Promise<UserDoc> {
    try {
      return await UserDoc.create<UserDoc>({ ...userDoc });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns UserDoc
   */
  async findById(id: string): Promise<UserDoc | null> {
    try {
      const userDocItem = await UserDoc.findByPk(id);

      if (!userDocItem) {
        throw new NotFoundException("UserDoc", id);
      }
      return userDocItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns UserDoc
   */
  async findByName(userId: string): Promise<UserDoc | null> {
    try {
      const userDocItem = await UserDoc.findOne({ where: { userId } });
      return userDocItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of UserDoc
   */
  async getAll(): Promise<UserDoc[]> {
    try {
      const userDocs = await UserDoc.findAll();
      return userDocs;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a UserDoc as parameter
   * @userDoc
   * returns void
   */
  async update(userDoc: IUserDoc): Promise<UserDoc> {
    const { id } = userDoc;
    try {
      const userDocItem: any = await UserDoc.findByPk(id);

      console.log(userDoc);
      if (!userDocItem) {
        throw new NotFoundException("UserDoc", id.toString());
      }

      return await userDocItem.update({ ...userDoc });
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
      const userDocItem = await UserDoc.findByPk(id);

      if (!userDocItem) {
        throw new NotFoundException("UserDoc", id);
      }

      await userDocItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
