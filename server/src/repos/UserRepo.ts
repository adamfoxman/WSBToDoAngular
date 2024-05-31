import { INewUser, IUpdateUser, IUser } from '@src/models/User';
import UserModel from '@src/models/User';

import PwdUtil from '@src/util/PwdUtil';

async function getOne(email: string): Promise<IUser | null> {
  return await UserModel.findOne({ email }).exec();
}

async function persists(id: string): Promise<boolean> {
  return (await UserModel.exists({ id })) !== null ? true : false;
}

async function persistsEmail(email: string) {
  return (await UserModel.exists({ email })) !== null ? true : false;
}

async function getAll(): Promise<IUser[]> {
  return await UserModel.find().exec();
}

async function add(user: INewUser): Promise<void> {
  const pwdHash = await PwdUtil.getHash(user.password);
  const newUser: IUser = new UserModel({
    name: user.name,
    email: user.email,
    pwdHash,
    role: user.role,
  });
  await newUser.save();
}

async function update(user: IUpdateUser): Promise<void> {
  const updatedUser: IUser = new UserModel({
    name: user.name,
    email: user.email,
    pwdHash: user.password ? await PwdUtil.getHash(user.password) : undefined,
    role: user.role,
  });
  await UserModel.updateOne({ id: user.id }, updatedUser).exec();
}

async function delete_(id: string): Promise<void> {
  await UserModel.findOneAndDelete({ id }).exec();
}

export default {
  getOne,
  persists,
  persistsEmail,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
