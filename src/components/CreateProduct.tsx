import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { createdProductInitialize, createProduct } from '../store/products';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const CreateProduct = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          title: data.get('title'),
          price: data.get('price'),
        });
      };
   
    const dispatch: AppDispatch = useDispatch();

    const { user: { currentUser, loggedIn } } = useSelector((state: RootState) => state);
    const { products: { createdProduct } } = useSelector((state: RootState) => state);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(-1);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(-1);
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
    const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryId(Number(event.target.value));
    };
    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        let imageList: string[]= event.target.value.split(","); 
        imageList = imageList.map(image => image.trim());
        setImages(imageList);
      };

    
    const onSubmit =() => {
      dispatch(createProduct({title:title, price:price, description: description , categoryId: categoryId, images:images}))
      //window.location.href="/product/"+createdProduct.id
    }
    if(!loggedIn){
      window.location.href = "/";
      }
    useEffect(() => {
      if(!loggedIn){
          window.location.href = "/";
      }
      if(JSON.stringify(createdProduct)!=='{}'){
        window.location.href="/product/"+createdProduct.id
        return
      }
      dispatch(createdProductInitialize())
    }, [dispatch, currentUser, loggedIn, createdProduct]);
    return(
        <ThemeProvider theme={defaultTheme}>
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
                  autoComplete="Title"
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
                  autoComplete="price"
                  onChange={handlePrice}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="category"
                  label="category"
                  type="category"
                  id="category"
                  autoComplete="New Category"
                  onChange={handleCategory}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="description"
                  type="description"
                  id="description"
                  autoComplete="description"
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
                  autoComplete="description"
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
    </ThemeProvider>
    );

}

export default CreateProduct;