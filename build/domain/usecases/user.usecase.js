"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
class UserUseCase {
    userRepository;
    /**
     *
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user) {
        const existingUser = await this.userRepository.findByName(user.username);
        if (existingUser) {
            throw new Error("User already exists");
        }
        // const _user = new User({user});
        //because it's already done in the Repository
        return this.userRepository.create(user);
    }
    async getAll() {
        return this.userRepository.getAll();
    }
    async getUserById(id) {
        return this.userRepository.findById(id);
    }
    async updateUser(user) {
        const obj = {
            ...user,
            updatedAt: new Date(),
        };
        return this.userRepository.update(obj);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
    async updateAvatar(id, filename) {
        const user = (await this.userRepository.findById(id));
        user.avatar = filename.toString();
        return await user.update({ ...user });
        // console.log("user: ", user, "fileName: ", filename)
        // const obj: IUser = {
        //   ...user,
        //   avatar: filename,
        //   updatedAt: new Date(),
        // } as IUser;
        // return this.userRepository.update(obj);
    }
}
exports.UserUseCase = UserUseCase;
