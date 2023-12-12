import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { createProduct } from '../store/products';
import { useNavigate } from 'react-router-dom';

import { MenuItem, Select } from '@mui/material';


// TODO remove, this demo shouldn't need to reset the theme.


const CreateProduct = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      };
   
    const dispatch: AppDispatch = useDispatch();

    const { user: { currentUser, loggedIn } } = useSelector((state: RootState) => state);
    const { categories: { catList} } = useSelector((state: RootState) => state);

   
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(-1);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [images, setImages] = useState([""]);
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };
    const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(Number(event.target.value));
    };
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleCategoryDropDown = (event: any) => {
      setCategoryId(Number(event.target.value));
    };
    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        let imageList: string[]= event.target.value.split(","); 
        imageList = imageList.map(image => image.trim());
        setImages(imageList);
      };

    
    const onSubmit =() => {
      dispatch(createProduct({title:title, price:price, description: description , categoryId: categoryId, images:images}))
     // navigate("/");
     // window.location.href="/product/"+createdProduct.id
    }
    if(!loggedIn){
      //window.location.href = "/";
      navigate("/");
      }
    useEffect(() => {
      if(!loggedIn){
          //window.location.href = "/";
          navigate("/");
      }
  
    }, [dispatch, currentUser, loggedIn, navigate]);
    return(
       
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="title"
                  name="title"
                  onChange={handleTitle}
                />
              </Grid>  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price $$"
                  name="price"
                  onChange={handlePrice}

                />
              </Grid>
              

              <Grid item xs={12}>
              <Select
              value={categoryId}
              onChange={handleCategoryDropDown}
            label="Select an option"
            >
            <MenuItem key="0" value="0" >
              Select Category
            </MenuItem>
        {catList.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
              </Grid>



              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  type="description"
                  id="description"
                  onChange={handleDescription}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="images"
                  label="image1, images2"
                  type="images"
                  id="images"
                  onChange={handleImages}

                />
                </ Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
            >
             Add Product
            </Button>

          </Box>
        </Box>
      </Container>
  
    );

}

export default CreateProduct;