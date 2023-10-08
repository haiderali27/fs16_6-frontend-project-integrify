import React, { useEffect } from "react";

import styled from "styled-components";

import Header from "../components/header";
import Footer from "../components/footer";
import ProductsList from "../components/productList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import categories from "../store/categories";



const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products: { list } } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!list.length) return;
  }, [dispatch, list.length]);
  return (
    <div>
      <ProductsList products={list} />
    </div>
  );
};

export default ProductsPage;