import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../constants/constants';
import productData from '../data/productData';

const handlers=[
    
    rest.get(`${BASE_URL}/products`, async (req, res, ctx) => {
        const title = req.url.searchParams.get('title');
        if(title){
          const foundProducts = productData.filter((p) => p.title === title);
          if (foundProducts) {
            return res(ctx.json(foundProducts));
            }
        }
        return res(ctx.json(productData));       
      }),
     
      rest.get(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
        const { id } = req.params;
        const foundProduct = productData.find((p) => p.id === Number(id));
        if (foundProduct) {
            return res(ctx.json(foundProduct));
            }
         }),
]

const productServer = setupServer(...handlers);

export default productServer;