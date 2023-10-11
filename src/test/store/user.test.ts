import { createStore } from "../../store/store";
import { login } from "../../store/user";
import usersData from '../data/userData';

import server, { access_token } from '../servers/userServer';


let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


describe('Test authReducer async actions', () => {
  test('Should login user with right credential', async () => {
    await store.dispatch(
      login({ email: 'integrifyadmin@gmail.com', password: 'Integrify1234' }),
    );
    console.log('################')
    expect(store.getState().user.tokens.tokens?.access_token).toBe(
      `${access_token}_${usersData[0].id}`,
    );
  });

});