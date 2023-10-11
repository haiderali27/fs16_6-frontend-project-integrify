import { Container, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getProducts, getProductsByCategory } from "../store/products";
import { useEffect, useState } from "react";

const CategoryList = ({ categories = []}) =>{
    const dispatch: AppDispatch = useDispatch();

   const list = categories;
  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = (event:any) => {
    setSelectedOption(event.target.value);
  };
  useEffect(()=>{
    if(selectedOption===0){
      dispatch(getProducts())
    }else{
      dispatch(getProductsByCategory(selectedOption))
    }
        
    },[dispatch, selectedOption]);
    return (
        <Container>
          Select Category:
        <Select
        value={selectedOption}
        onChange={handleChange}
        label="Select an option"
      >
        <MenuItem value="">
          <em>Select an option</em>
        </MenuItem>
        {list.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
      </Container>
    );

}

export default CategoryList;