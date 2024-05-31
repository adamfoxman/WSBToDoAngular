import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { INewUser, IUpdateUser, IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users: IUser[] = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<INewUser>, res: IRes) {
  const user: INewUser = req.body;
  await UserService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Register new user.
 */
async function register(req: IReq<INewUser>, res: IRes) {
  const user: INewUser = req.body;
  await UserService.register(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<IUpdateUser>, res: IRes) {
  const user: IUpdateUser = req.body;
  await UserService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id: string = req.params.id;
  await UserService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getAll,
  add,
  register,
  update,
  delete: delete_,
} as const;
