import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../constants/constants';
import usersData from '../data/userData';

export const access_token = 'my-access-token';

export const handlers = [
  // login
  rest.post(`${BASE_URL}/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password,
    );
    if (foundUser) {
      const token = access_token + '_' + foundUser.id;
      return res(ctx.json({ access_token: token }));
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: `Unauthorized`,
        }),
      );
    }
  }),

  // get new access token
  rest.post(`${BASE_URL}/refresh-token`, async (req, res, ctx) => {
    const { refreshToken } = await req.json();
    const userid = refreshToken.split('_')[1];
    const foundUser = usersData.find((u) => u.id === Number(userid));
    if (foundUser) {
      const token = access_token + '_' + foundUser.id;
      return res(ctx.json({ access_token: token }));
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: `Unauthorized`,
        }),
      );
    }
  }),

  // get profile
  rest.get(`${BASE_URL}/profile`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');
    const token = authorization?.split(' ')[1];
    const userid = token?.split('_')[1];
    const foundUser = usersData.find((u) => u.id === Number(userid));
    if (foundUser) {
      return res(ctx.json(foundUser));
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: `Unauthorized`,
        }),
      );
    }
  }),
];

const userServer = setupServer(...handlers);

export default userServer;