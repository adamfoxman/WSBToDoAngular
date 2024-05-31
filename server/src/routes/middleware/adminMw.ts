import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import SessionUtil from '@src/util/SessionUtil';
import { ISessionUser, UserRoles } from '@src/models/User';

const USER_UNAUTHORIZED_ERR = 'User not authorized to perform this action';

type TSessionData = ISessionUser & JwtPayload;

async function adminMw(req: Request, res: Response, next: NextFunction) {
  // Get session data
  const sessionData = await SessionUtil.getSessionData<TSessionData>(req);
  // Set session data to locals
  if (
    typeof sessionData === 'object' &&
    sessionData?.role === UserRoles.Admin
  ) {
    res.locals.sessionUser = sessionData;
    return next();
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: USER_UNAUTHORIZED_ERR });
  }
}

export default adminMw;
