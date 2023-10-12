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
    expect(store.getState().user.loggedIn).toBe(
      true,
    );
  
  });

  test('Should not login user with wrong credentials', async () => {
    await store.dispatch(
      login({ email: 'integrifyadmin@gmail.com', password: 'Integrify124' }),
    );
    expect(store.getState().user.error).toBe(
      "Login Failed",
    );  
  });

  test('Should Register with correct details', async () => {
    await store.dispatch(
      createUser({ email: 'integrifyadmin1@gmail.com', password: 'Integrify1234' , avatar:"https://api.lorem.space/image/face?w=640&h=480&r=867", name:"Integrify User", role:"admin"}),
    );
    expect(store.getState().user.currentUser.currentUser?.email).toBe(
      'integrifyadmin1@gmail.com',
    );
  
  });

  test('Should not Register with wrong details', async () => {
    await store.dispatch(
      createUser({ email: 'integrifyadmin1@gmail.com', password: 'Integrify1234' , avatar:"", name:"Integrify User", role:"admin"}),
    );
    expect(store.getState().user.error).toBe(
      'Register Failed',
    );
  
  });

});