import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductsList from "../components/Products";
import CategoryList from "../components/Categories";
import { AppDispatch, RootState } from "../store/store";
import { getProductsByPriceRange, sortByPriceAsc, sortByPriceDesc } from "../store/products";
import { Container } from "@mui/system";
import { MenuItem, Select } from "@mui/material";
import { CSSProperties } from 'react';






const ProductsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products: { list } } = useSelector((state: RootState) => state);
  const { categories: { catList} } = useSelector((state: RootState) => state);
  const divStyleOut:CSSProperties = {
    color: 'blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'

  };
  const divStyleInner1:CSSProperties = {
    color: 'blue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  };
  const numericalValues = Array.from({ length: 50 }, (_, index) => index * 5 + 5);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionPriceChange, setSelectedOptionPriceChange] = useState(false);

  const [price, setPrice] = useState("");
  const handlePrice = (event: any) => {
    setSelectedOptionPriceChange(true);
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
    if(selectedOptionPriceChange){
      //dispatch(sortByPriceRange(price))
      dispatch(getProductsByPriceRange(Number(price)))
      setSelectedOptionPriceChange(false)
    }
  }, [dispatch, selectedOption, selectedOptionPriceChange, price]);
  return (
    <div style={divStyleOut}>
      <div style={divStyleInner1}>
      <Container>
            Select Price:
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
          Sort By Price:
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
      </div>
      <div>
      <ProductsList products={list}/>
      </div>
    </div>
    
  );
};

export default ProductsPage;