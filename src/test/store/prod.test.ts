import { createStore } from "../../store/store";
import { getProducts, getProductsByTitle, getSingleProduct } from "../../store/products";
import server from '../servers/productServer';
import productData from "../data/productData";


let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


describe('Test productUser async actions', () => {

    test('Should Received Expected Products', async () => {
        await store.dispatch(
          //getSingleProduct("1"),
            getProducts(0)
          );
        expect(JSON.stringify(store.getState().products.list)).toBe(
          JSON.stringify(productData),
        );
      
      });
      test('Should Recieved  Expected Single Product', async () => {
        await store.dispatch(
            getSingleProduct(productData[0].id+"")
          );
        expect(JSON.stringify(store.getState().products.product)).toBe(
          JSON.stringify(productData[0]),
        );
      
      });
      const foundProduct = productData.filter((p) => p.title === "Incredible Wooden Computer");
      test('Should Recieved  Filter by title', async () => {
        await store.dispatch(
            getProductsByTitle('Incredible Wooden Computer')
          );
        expect(JSON.stringify(store.getState().products.list)).toBe(
          JSON.stringify(foundProduct),
        );
      
      });
      
});
