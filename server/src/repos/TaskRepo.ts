import TaskModel, { ITask } from '@src/models/Task';
import { ISessionUser } from '@src/models/User';

async function getAll(user: ISessionUser | undefined): Promise<ITask[]> {
  return TaskModel.find({
    owner: user?.id,
  }).exec();
}

async function persists(id: string): Promise<boolean> {
  return (await TaskModel.exists({ _id: id })) !== null ? true : false;
}

async function add(task: ITask): Promise<void> {
  const newTask: ITask = new TaskModel(task);
  await newTask.save();
}

async function update(task: ITask): Promise<void> {
  await TaskModel.updateOne({ _id: task._id }, task).exec();
}

async function delete_(id: string, user: ISessionUser | undefined): Promise<void> {
  await TaskModel.findOneAndDelete({ _id: id }).exec();
}

async function getOneWithUserCheck(
  id: string,
  user: ISessionUser,
): Promise<ITask | null> {
  return TaskModel.findOne({ _id: id, owner: user.id }).exec();
}

async function updateWithUserCheck(
  task: ITask,
  user: ISessionUser | undefined,
): Promise<void> {
  await TaskModel.updateOne
    ({ _id: task._id, owner: user?.id }, task).exec();
}

export default {
  getAll,
  persists,
  add,
  update,
  delete: delete_,
  getOneWithUserCheck,
  updateWithUserCheck,
} as const;
