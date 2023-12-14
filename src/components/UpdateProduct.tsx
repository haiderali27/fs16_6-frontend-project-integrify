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
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



const defaultTheme = createTheme();

const UpdateProduct = () => {
  const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      };
   
    const dispatch: AppDispatch = useDispatch();
    const { user: { currentUser, loggedIn, tokens } } = useSelector((state: RootState) => state);
    const [token, setToken] = useState(tokens.tokens?.access_token)

    const { products:{product}} = useSelector((state: RootState) => state);
    const { categories: { catList} } = useSelector((state: RootState) => state);

    const {id}  = useParams();
    let updateId: any = id;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(-1);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("0");

    //const [images, setImages] = useState([""]);
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

    const [imageInputs, setImageInputs] = useState<string[]>(['']); // Initial state with one empty string

    const handleImageInputChange = (index: number, value: string) => {
      const updatedInputs = [...imageInputs];
      updatedInputs[index] = value;
      setImageInputs(updatedInputs);
    };
  
    const addImageInput = () => {
      setImageInputs([...imageInputs, '']); // Add a new empty string to the array
    };
  
    const deleteImageInput = (index: number) => {
      const updatedInputs = [...imageInputs];
      updatedInputs.splice(index, 1); // Remove the element at the specified index
      setImageInputs(updatedInputs);
    };
    /*
    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        let imageList: string[]= event.target.value.split(","); 
        imageList = imageList.map(image => image.trim());
        setImages(imageList);
      };
      */

      const handleCategoryDropDown = (event: any) => {
        setCategoryId(event.target.value);
      };

    
    const onSubmit =() => {
      dispatch(updateProduct({id:updateId, title:title, price:price, description: description , categoryId: categoryId, images:imageInputs, token:token||""}))
    }

    if(!loggedIn){
      //window.location.href = "/";
      navigate('/')
      }
    useEffect(() => {

      setToken(tokens.tokens?.access_token)

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
        //setImages(product.images)
        setImageInputs(product.images)
        setInitializedProd(true)
        }
        
      }
    }, [dispatch, currentUser, loggedIn, product, updateId, navigate, initializedProd, tokens]);
    //console.log('############1', product.images, product.id, product.price, product.category, product.title)

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
                  type="number"
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
              {imageInputs.map((image, index) => (
              <Grid container item xs={12} spacing={1} key={index}>
                <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    label={`Image ${index + 1}`}
                    type="text"
                    value={image}
                    onChange={(e) => handleImageInputChange(index, e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => deleteImageInput(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}     
             <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={addImageInput}>
                  Add Image
                </Button>
              </Grid>               
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