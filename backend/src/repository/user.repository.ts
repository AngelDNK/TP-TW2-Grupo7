import { User } from "../models/user.model";

export class UserRepository {

  static async buscarPorEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  static async crear(data: any) {
    return await User.create(data);
  }

  static async actualizarPassword(id: number, hash: string) {
    const user = await User.findByPk(id);
    if (!user) return null;

    user.password = hash;
    await user.save();

    return user;
  }
}