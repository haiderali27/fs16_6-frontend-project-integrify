import { Container, MenuItem, Select } from "@mui/material";
import { Category } from "../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { filteredByCategories } from "../store/products";
import { useEffect, useState } from "react";

const CategoryList = ({ categories = []}) =>{
    const dispatch: AppDispatch = useDispatch();

   const list = categories;
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event:any) => {
    setSelectedOption(event.target.value);
  };
  useEffect(()=>{
    const tempList = list.filter(({id})=>id===selectedOption);
    if(tempList.length>0){
        dispatch(filteredByCategories(tempList[0]))
    }else{
      dispatch(filteredByCategories(tempList))

    }
        
    },[selectedOption]);
    return (
        <Container>
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