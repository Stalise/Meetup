import type { QueryResult } from 'pg';

import db from 'helpers/init-db';
import ApiError from 'helpers/api-error';
import responseMessages from 'data/messages/response';
import type { IAuthorization } from 'types/authorization';

export const login = async ({ mail, password }: IAuthorization) => {
  const authData: QueryResult<IAuthorization> = await db.query(
    `SELECT mail, password
    FROM users
    WHERE mail = $1`,
    [mail]
  );

  if (!authData.rows.length) {
    throw new ApiError(responseMessages.missingMail, 409);
  }

  if (authData.rows[0]?.password !== password) {
    throw new ApiError(responseMessages.invalidPassword, 409);
  }
};