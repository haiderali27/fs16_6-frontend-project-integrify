import { createStore } from "../../store/store";
import { createUser, login } from "../../store/user";
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
  
  
  test('Should login user with right credentials', async () => {
    await store.dispatch(
      login({ email: `${usersData[0].email}`, password: `${usersData[0].password}` }),
    );
    expect(JSON.stringify(store.getState().user.currentUser.currentUser)).toBe(
      JSON.stringify(usersData[0]),
    );
  
  });


  test('Should not login user with wrong credentials', async () => {
    await store.dispatch(
      login({ email:`${usersData[0].email}`, password: `${usersData[0].password}+1` }),
    );
    expect(store.getState().user.error).toBe(
      "Login Failed",
    );  
  });
});