import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductsList from "../components/Products";
import CategoryList from "../components/Categories";
import { AppDispatch, RootState } from "../store/store";
import { getProducts, getProductsByPriceRange, getProductsByTitle, sortByPriceAsc, sortByPriceDesc } from "../store/products";
import { IconButton, MenuItem, Pagination, Select, Stack, TextField } from "@mui/material";
import { CSSProperties } from 'react';
import SearchIcon from '@mui/icons-material/Search';



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
    alignContent:'flex-end',
    justifyContent: 'space-around',
    marginTop:'100px'

  };
  const divStyleInner2:CSSProperties = {
    color: 'blue',
    display: 'flex',
    flexDirection: 'row',
    alignContent:'flex-end',
    justifyContent: 'space-around',
    marginTop:'100px'

  };
  const [selectedOption, setSelectedOption] = useState('0');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  const [searchPriceClicked, setSearchPriceClicked] = useState(false);
  const [prodTitle, setProdTitle] = useState('');
  const [offset, setOffset] = useState(0)
  const [searchTitleClicked, setSearchTitleClicked] = useState(false);
  const [offsetChanged, setOffsetChanged] = useState(false);

  
  const handleMinPrice = (event: any) => {
    setMinPrice(Number(event.target.value));
  };
  const handleMaxPrice = (event: any) => {
    setMaxPrice(Number(event.target.value));
  };
  const handleChange = (event:any) => {
    setSelectedOption(event.target.value);
    if(selectedOption==='ASC'){
      dispatch(sortByPriceAsc())
    }else if(selectedOption==='DESC'){
      dispatch(sortByPriceDesc())
    }else{
      dispatch(getProducts(offset))
    }
  };
  const handleProdTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProdTitle(event.target.value);
  };
  const handlePaginationChange = (event:any, value:any) => {
    setOffset(value)
    setOffsetChanged(true)
    //console.log(`Changed to page ${value}`);
  };
  useEffect(() => {
    if(searchPriceClicked){
      //dispatch(sortByPriceRange(price))
      dispatch(getProductsByPriceRange({min_price: minPrice, max_price: maxPrice}))
      setSearchPriceClicked(false);
    }
    if(searchTitleClicked){
      dispatch(getProductsByTitle(prodTitle))
      setSearchTitleClicked(false)
    }
    if(offsetChanged){
      setOffsetChanged(false)
      dispatch(getProducts(offset))
    }
  }, [dispatch, minPrice, maxPrice, searchPriceClicked, searchTitleClicked, prodTitle, offset, offsetChanged]);
  return (
  
    <div style={divStyleOut}>
      <div style={divStyleInner1}> 
      <div>
      <TextField
          id="outlined-number"
          onChange={handleMinPrice}
          label="Min Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: '100px' }}
        />
         <TextField
          id="outlined-number"
          onChange={handleMaxPrice}
          label="Max Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: '100px' }}
        />
        <IconButton aria-label="cart" onClick={()=>{
          setSearchPriceClicked(true);
        }}> 
        <SearchIcon />
        </IconButton>
        </div>
        <div>
        <TextField
          id="outlined-search" type="search"
          label="Product Title"
          defaultValue="Some Product"
          onChange={handleProdTitle}
        />
        <IconButton aria-label="cart" onClick={()=>{
          setSearchTitleClicked(true);
        }}> 
        <SearchIcon />
        </IconButton>
        </div>
          
        <Select
        value={selectedOption}
        onChange={handleChange}
          >

          <MenuItem key='0' value='0' >
            Sort Products
          </MenuItem>    
          <MenuItem key="ASC" value="ASC">
            ASC
          </MenuItem>
          <MenuItem key="DESC" value="DESC">
            DESC
          </MenuItem>
         
      </Select>
     
      
      <CategoryList categories={catList} />
      </div>

      <div style={divStyleInner2}>
      <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handlePaginationChange} />
      </Stack>
      </div>

      <div>
       
      <ProductsList products={list}/>
      </div>
    </div>
    
  );
};

export default ProductsPage;