import { IReq, IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import TasksService from '@src/services/TasksService';
import { ITask } from '@src/models/Task';

async function getAll(_: IReq, res: IRes) {
  const user = res.locals.sessionUser;
  const tasks = await TasksService.getAll(user);
  return res.status(HttpStatusCodes.OK).json({ tasks });
}

async function add(req: IReq<ITask>, res: IRes) {
  const task: ITask = req.body;
  await TasksService.addTask(task);
  return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<ITask>, res: IRes) {
  const task: ITask = req.body;
  const user = res.locals.sessionUser;
  await TasksService.updateTask(task, user);
  return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
  const id: string = req.params.id;
  const user = res.locals.sessionUser;
  await TasksService.delete(id, user);
  return res.status(HttpStatusCodes.OK).end();
}

async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  const user = res.locals.sessionUser;
  const task = await TasksService.getOne(id, user);
  if (!task) {
    return res.status(HttpStatusCodes.NOT_FOUND).end();
  }
  return res.status(HttpStatusCodes.OK).json({ task });
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
  getOne,
} as const;
