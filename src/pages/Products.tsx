import React, { useEffect } from "react";

import styled from "styled-components";

import Header from "../components/header";
import Footer from "../components/footer";
import ProductsList from "../components/productList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import categories from "../store/categories";

const Container = styled.div``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products: { list } } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (!list.length) return;
  }, [dispatch, list.length]);
  return (
    <Container>
      <ProductsList products={list} />
    </Container>
  );
};

export default ProductsPage;