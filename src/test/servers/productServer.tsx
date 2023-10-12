import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../constants/constants';
import productData from '../data/productData';

const handlers=[
    
    rest.get(`${BASE_URL}/products?offset=0&limit=10`, async (req, res, ctx) => {
        return res(ctx.json(productData));       
      }),

      rest.get(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
        const { id } = req.params;
        const foundProduct = productData.find((p) => p.id === Number(id));
        if (foundProduct) {
            return res(ctx.json(foundProduct));
            }
         }),

        rest.get(`${BASE_URL}/products/?title=:title`, async (req, res, ctx) => {
        const  {title}  = req.params;
        const foundProducts = productData.filter((p) => p.title === title);
        if (foundProducts) {
            return res(ctx.json(foundProducts));
            }
            }),

]

const productServer = setupServer(...handlers);

export default productServer;