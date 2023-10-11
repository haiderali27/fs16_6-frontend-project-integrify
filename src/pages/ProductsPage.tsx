import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductsList from "../components/Products";
import CategoryList from "../components/Categories";
import { AppDispatch, RootState } from "../store/store";
import {sortByPriceAsc, sortByPriceDesc, sortByPriceRange } from "../store/products";
import { Container } from "@mui/system";
import { MenuItem, Select } from "@mui/material";





const ProductsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products: { list } } = useSelector((state: RootState) => state);
  const { categories: { catList} } = useSelector((state: RootState) => state);
  const divStyle = {
    overflow:'auto',
    color: 'blue',
    display: 'flex',
    justifyContent: 'center'

  };
  const numericalValues = Array.from({ length: 1000 }, (_, index) => index * 5 + 5);

  const [selectedOption, setSelectedOption] = useState('');
  const [price, setPrice] = useState("");
  const handlePrice = (event: any) => {
    setPrice(event.target.value);
  };
  const handleChange = (event:any) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    if(selectedOption==='ASC'){
      dispatch(sortByPriceAsc())
    }else if(selectedOption==='DESC'){
      dispatch(sortByPriceDesc())
    }

    dispatch(sortByPriceRange(price))
  }, [dispatch, selectedOption, price]);
  return (
    <div style={divStyle}>

        <Container>
            <Select
            value={selectedOption}
            onChange={handlePrice}
            label="Select an option"
          >
            <MenuItem value="10000000">
              <em>Select an option</em>
            </MenuItem>
            {numericalValues.map(value => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
            
          </Select>
        </Container>
        <Container>
        <Select
        value={selectedOption}
        onChange={handleChange}
        label="Select an option"
      >
        <MenuItem value="">
          <em>Select an option</em>
        </MenuItem>
          <MenuItem key="ASC" value="ASC">
            ASC
          </MenuItem>
          <MenuItem key="DESC" value="DESC">
            DESC
          </MenuItem>
         
      </Select>
      </Container>
      <CategoryList categories={catList} />
      <ProductsList products={list}/>
    </div>
  );
};

export default ProductsPage;