import { User } from "../../entities/user";
import { IUser } from "../../../domain/models/user";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";
import bcrypt from "bcrypt";
export class UserRepository implements IRepository<IUser, User> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a User as parameter
   * @user
   * returns void
   */
  async create(user: IUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.authStrategy = 'local-auth'
    // user.phoneNumber = user.whatsappNumber

    try {
      return await User.create<User>(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns User
   */
  async findById(id: string): Promise<User | null> {
    try {
      const userItem = await User.findByPk(id);

      if (!userItem) {
        throw new NotFoundException("User", id);
      }
      return userItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns User
   */
  async findByName(name: string): Promise<User | null> {
    try {
      const userItem = await User.findOne({ where: { username: name } });
      return userItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of User
   */
  async getAll(): Promise<User[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a User as parameter
   * @user
   * returns void
   */
  async update(user: IUser): Promise<User> {
    const { id } = user;
    try {
      const userItem: any = await User.findByPk(id);

      console.log(user);
      if (!userItem) {
        throw new NotFoundException("User", id.toString());
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      return await userItem.update({ ...user });
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
      const userItem = await User.findByPk(id);

      if (!userItem) {
        throw new NotFoundException("User", id);
      }

      await userItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
