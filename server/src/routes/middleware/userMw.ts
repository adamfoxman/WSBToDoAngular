import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import SessionUtil from '@src/util/SessionUtil';
import { ISessionUser, UserRoles } from '@src/models/User';
import { ITask } from '@src/models/Task';

const USER_UNAUTHORIZED_ERR = 'User not authorized to perform this action';

type TSessionData = ISessionUser & JwtPayload;

async function userMw(req: Request, res: Response, next: NextFunction) {
  const sessionData = await SessionUtil.getSessionData<TSessionData>(req);
  if (
    typeof sessionData === 'object' &&
    (sessionData?.role === UserRoles.Admin ||
      sessionData?.role === UserRoles.Standard)
  ) {
    res.locals.sessionUser = sessionData;
    return next();
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: USER_UNAUTHORIZED_ERR });
  }
}

async function taskOwnershipMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = res.locals.sessionUser;
  const task = req.body as ITask;
  if (user?.id === task?.owner) {
    return next();
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: USER_UNAUTHORIZED_ERR });
  }
}

export default {
  userMw,
  taskOwnershipMw,
} as const;
