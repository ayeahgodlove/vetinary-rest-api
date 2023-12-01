import { User } from "../../data/entities/user";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IUser } from "../models/user";

export class UserUseCase {
  /**
   *
   */
  constructor(private readonly userRepository: IRepository<IUser, User>) {}

  async createUser(user: IUser): Promise<User> {
    const existingUser = await this.userRepository.findByName(user.username);

    if (existingUser) {
      throw new Error("User already exists");
    }

    // const _user = new User({user});
    //because it's already done in the Repository
    return this.userRepository.create(user);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(user: IUser): Promise<User> {
    const obj: IUser = {
      ...user,
      updatedAt: new Date(),
    };
    return this.userRepository.update(obj);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
  async updateAvatar(id: string, filename: string): Promise<User> {
    const user = (await this.userRepository.findById(id)) as User;

    user.avatar = filename.toString();
    return await user.update({...user});
    // console.log("user: ", user, "fileName: ", filename)
    // const obj: IUser = {
    //   ...user,
    //   avatar: filename,
    //   updatedAt: new Date(),
    // } as IUser;

    // return this.userRepository.update(obj);
  }
}
