import { UserDoc } from "../../data/entities/user-doc";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IUserDoc } from "../models/user-doc";

export class UserDocUseCase {
  /**
   *
   */
  constructor(private readonly userDocRepository: IRepository<IUserDoc, UserDoc>) {}

  async createUserDoc(userDoc: IUserDoc): Promise<UserDoc> {
    const existingUserDoc = await this.userDocRepository.findByName(userDoc.userId);
    

    if (existingUserDoc) {
      throw new Error("UserDoc already exists");
    }

    // const _userDoc = new UserDoc({userDoc});
    //because it's already done in the Repository
    return this.userDocRepository.create(userDoc);
  }

  async getAll(): Promise<UserDoc[]> {
    return this.userDocRepository.getAll();
  }

  async getUserDocById(id: string): Promise<UserDoc | null> {
    return this.userDocRepository.findById(id);
  }

  async updateUserDoc(userDoc: IUserDoc): Promise<UserDoc> {
    const obj: IUserDoc = {
      ...userDoc,
    };
    return this.userDocRepository.update(obj);
  }

  async deleteUserDoc(id: string): Promise<void> {
    return this.userDocRepository.delete(id);
  }
}
