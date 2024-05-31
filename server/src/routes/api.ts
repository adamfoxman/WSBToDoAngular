import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from '../constants/Paths';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import TaskRoutes from './TaskRoutes';
import UserMiddleware from './middleware/userMw';

const apiRouter = Router(),
  validate = jetValidator();

const authRouter = Router();
/**
 * Register a user.
 *
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a user.
 *     description: Register a new user. This is the same as adding a user, but
 *      with the added step of checking if the email already exists.
 *     tags:
 *     - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *     responses:
 *       201:
 *         description: User added successfully.
 *       400:
 *         description: Invalid user data.
 *       403:
 *         description: Email already exists.
 */
authRouter.post(Paths.Auth.Register, UserRoutes.register);

/**
 * Login user.
 *
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user.
 *     description: Login user with email and password.
 *     tags:
 *     - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid email or password.
 */
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

/**
 * Logout user.
 *
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user.
 *     description: Logout currently logged-in user.
 *     tags:
 *     - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add UserRouter ** //

const userRouter = Router();

/**
 * Get all users.
 *
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users.
 *     description: Get all registered users.
 *     tags:
 *     - Users
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: User ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: User name.
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         description: User email.
 *                         example: john@example.com
 */
userRouter.get(Paths.Users.Get, UserRoutes.getAll);

/**
 * Add a user.
 *
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: Add a user.
 *     description: Add a new user.
 *     tags:
 *     - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: User role.
 *                 example: STANDARD
 *     responses:
 *       201:
 *         description: User added successfully.
 *       400:
 *         description: Invalid user data.
 */
userRouter.post(Paths.Users.Add, UserRoutes.add);

/**
 * Update a user.
 *
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update a user.
 *     description: Update an existing user.
 *     tags:
 *     - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: User ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: User role.
 *                 example: STANDARD
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid user data.
 */
userRouter.put(Paths.Users.Update, UserRoutes.update);

/**
 * Delete a user.
 *
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user.
 *     description: Delete an existing user.
 *     tags:
 *     - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID.
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Invalid user data.
 */
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'string', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);

const taskRouter = Router();

/**
 * Get all tasks.
 *
 * @swagger
 * /api/tasks/all:
 *   get:
 *     summary: Get all tasks.
 *     description: Get all tasks.
 *     tags:
 *     - Tasks
 *     responses:
 *       200:
 *         description: All tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Task ID.
 *                         example: 1
 *                       owner:
 *                         type: string
 *                         description: Task owner.
 *                         example: 5f9a2b9a9d6b2b1b1c9d9c9d
 *                       title:
 *                         type: string
 *                         description: Task title.
 *                         example: Make a coffee.
 *                       description:
 *                         type: string
 *                         description: Task description.
 *                         example: Make a coffee with milk.
 *                       done:
 *                         type: boolean
 *                         description: Task done.
 *                         example: false
 *                       dueDate:
 *                         type: string
 *                         description: Task due date.
 *                         example: 2020-10-30T00:00:00.000Z
 *                       priority:
 *                         type: string
 *                         description: Task priority.
 *                         example: NONE
 */
taskRouter.get(Paths.Tasks.Get, TaskRoutes.getAll);

/**
 * Add a task.
 *
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Add a task.
 *     description: Add a new task.
 *     tags:
 *     - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: Task owner.
 *                 example: 5f9a2b9a9d6b2b1b1c9d9c9d
 *               title:
 *                 type: string
 *                 description: Task title.
 *                 example: Make a coffee.
 *               description:
 *                 type: string
 *                 description: Task description.
 *                 example: Make a coffee with milk.
 *               done:
 *                 type: boolean
 *                 description: Task done.
 *                 example: false
 *               dueDate:
 *                 type: string
 *                 description: Task due date.
 *                 example: 2020-10-30T00:00:00.000Z
 *               priority:
 *                 type: string
 *                 description: Task priority.
 *                 example: NONE
 *     responses:
 *       201:
 *         description: Task added successfully.
 *       400:
 *         description: Invalid task data.
 */
taskRouter.post(
  Paths.Tasks.Add,
  UserMiddleware.taskOwnershipMw,
  TaskRoutes.add,
);

/**
 * Update a task.
 *
 * @swagger
 * /api/tasks/update:
 *   put:
 *     summary: Update a task.
 *     description: Update an existing task.
 *     tags:
 *     - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: number
 *                 description: Task ID.
 *                 example: 1
 *               owner:
 *                 type: string
 *                 description: Task owner.
 *                 example: 5f9a2b9a9d6b2b1b1c9d9c9d
 *               title:
 *                 type: string
 *                 description: Task title.
 *                 example: Make a coffee.
 *               description:
 *                 type: string
 *                 description: Task description.
 *                 example: Make a coffee with milk.
 *               done:
 *                 type: boolean
 *                 description: Task done.
 *                 example: false
 *               dueDate:
 *                 type: string
 *                 description: Task due date.
 *                 example: 2020-10-30T00:00:00.000Z
 *               priority:
 *                 type: string
 *                 description: Task priority.
 *                 example: NONE
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Invalid task data.
 */
taskRouter.put(Paths.Tasks.Update, TaskRoutes.update);

/**
 * Delete a task.
 *
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task.
 *     description: Delete an existing task.
 *     tags:
 *     - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID.
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       400:
 *         description: Invalid task data.
 */
taskRouter.delete(
  Paths.Tasks.Delete,
  validate(['id', 'string', 'params']),
  TaskRoutes.delete,
);

/**
 * Get one task.
 *
 * @swagger
 * /api/tasks/{id}:
 *  get:
 *    summary: Get one task.
 *    description: Get one task.
 *    tags:
 *    - Tasks
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Task ID.
 *        schema:
 *        type: string
 *        example: 5f9a2b9a9d6b2b1b1c9d9c9d
 *    responses:
 *      200:
 *         description: Task.
 *         content:
 *           application/json:
 *             schema:
 *                properties:
 *                  id:
 *                    type: number
 *                    description: Task ID.
 *                    example: 1
 *                  owner:
 *                    type: string
 *                    description: Task owner.
 *                    example: 5f9a2b9a9d6b2b1b1c9d9c9d
 *                  title:
 *                    type: string
 *                    description: Task title.
 *                    example: Make a coffee.
 *                  description:
 *                    type: string
 *                    description: Task description.
 *                    example: Make a coffee with milk.
 *                  done:
 *                    type: boolean
 *                    description: Task done.
 *                    example: false
 *                  dueDate:
 *                    type: string
 *                    description: Task due date.
 *                    example: 2020-10-30T00:00:00.000Z
 *                  priority:
 *                    type: string
 *                    description: Task priority.
 *                    example: LOW
 *      400:
 *        description: Invalid task data.
 *      404:
 *        description: Task not found.
 */
taskRouter.get(
  Paths.Tasks.GetOne,
  validate(['id', 'string', 'params']),
  TaskRoutes.getOne,
);

apiRouter.use(Paths.Tasks.Base, UserMiddleware.userMw, taskRouter);

export default apiRouter;
