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
import { getSingleProduct, updateProduct } from '../store/products';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';



const defaultTheme = createTheme();

const UpdateProduct = () => {
  const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      };
   
    const dispatch: AppDispatch = useDispatch();
    const { user: { currentUser, loggedIn } } = useSelector((state: RootState) => state);

    const { products:{product}} = useSelector((state: RootState) => state);
    const { categories: { catList} } = useSelector((state: RootState) => state);

    const {id}  = useParams();
    let updateId: number = Number(id)||0;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(-1);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(-1);
    const [images, setImages] = useState([""]);
    const [initializedProd, setInitializedProd] = useState(false)
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };
    const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(Number(event.target.value));
    };
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        let imageList: string[]= event.target.value.split(","); 
        imageList = imageList.map(image => image.trim());
        setImages(imageList);
      };

      const handleCategoryDropDown = (event: any) => {
        setCategoryId(Number(event.target.value));
      };

    
    const onSubmit =() => {
      dispatch(updateProduct({id:updateId, title:title, price:price, description: description , categoryId: categoryId, images:images}))
    }

    if(!loggedIn){
      //window.location.href = "/";
      navigate('/')
      }
    useEffect(() => {
      if(JSON.stringify(product)==='{}'){
        dispatch(getSingleProduct(updateId+""))
      }
      if(!loggedIn&&currentUser && currentUser.currentUser && currentUser.currentUser.role!=='admin'){
          //window.location.href = "/";
          navigate('/')
      }
   
      if (product && product.images && product.id && product.price && product.category && product.title && product.description) {
        if(!initializedProd){
        setTitle(product.title)
        setPrice(product.price)
        setCategoryId(product.category.id)
        setDescription(product.description)
        setImages(product.images)
        }
        setInitializedProd(true)
      }
    }, [dispatch, currentUser, loggedIn, product, updateId, navigate, initializedProd]);

    if (!product || !product.images || !product.id || !product.price || !product.category ||!product.title) {
      return null;
    }
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
            Update Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  name="title"
                  autoComplete="Title"
                  onChange={handleTitle}
                  value={title}
                />
              </Grid>  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  name="price"
                  autoComplete="price"
                  onChange={handlePrice}
                  value={price}

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
                  type="description"
                  id="description"
                  autoComplete="description"
                  onChange={handleDescription}
                  value={description}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="images"
                  type="images"
                  id="images"
                  autoComplete="description"
                  onChange={handleImages}
                  value={ images}
                  
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
             Update Product
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );

}

export default UpdateProduct;