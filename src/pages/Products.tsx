import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductsList from "../components/productList";
import { AppDispatch, RootState } from "../store/store";

import { filteredByCategories, sortByPrice } from "../store/products";





const ProductsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products: { list } } = useSelector((state: RootState) => state);
  const { categories: { catList} } = useSelector((state: RootState) => state);


  const handleSortByPrice = (maxPrice: number) => {
    dispatch(sortByPrice(maxPrice));
  };

  const handleFilterByCategory = (categoryName: string) => {
    dispatch(filteredByCategories(categoryName));
  };
  useEffect(() => {
    if (!list.length) return;
  }, [dispatch, list.length]);
  return (
    <div>
        
      <ProductsList products={list}/>
    </div>
  );
};

export default ProductsPage;