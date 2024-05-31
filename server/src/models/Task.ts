import { Schema, model, Document } from 'mongoose';

enum Priority {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export interface ITask extends Document {
  owner: string;
  title: string;
  description?: string;
  done: boolean;
  dueDate?: Date;
  priority?: string;
}

const TaskSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  done: { type: Boolean, required: true },
  dueDate: { type: Date, required: false },
  priority: {
    type: String,
    enum: Priority,
    required: false,
  },
});

TaskSchema.virtual('id').get(function (this: ITask): string {
  return this._id;
});

TaskSchema.virtual('url').get(function (this: ITask): string {
  return `/tasks/${this._id}`;
});

export default model<ITask>('Task', TaskSchema);
