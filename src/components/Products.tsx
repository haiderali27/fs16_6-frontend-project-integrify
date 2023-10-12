import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import {Product} from "../types/types";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addToCart } from "../store/cart";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteProduct } from "../store/products";

const divStyle = {
    overflow:'auto',
    color: 'blue',
    display: 'flex',
    justifyContent: 'space-around'

  };
const initialStateProduct: Product ={}



const ProductsList = ({ products = [initialStateProduct]}) => {
    
  const list = products;
  const dispatch: AppDispatch = useDispatch();
  const { user: { currentUser } } = useSelector((state: RootState) => state);

  
  return (
    
    <>
    <div style={divStyle}>
        <Grid container spacing={2} justifyContent="center" marginTop='50px'>
      
            {list.map(({ id, images, title, description, price, category }: Product) => (
              images!==undefined&&
                
                    <Card key={id} sx={{ width: 345, marginBottom: 10, marginRight:10, marginLeft:10 }}>
                    <Link to={`/product/${id}`} key={id}>
                    <CardHeader
                          title={title}
                          subheader={category?.name}
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={images[0]}
                          alt="Paella dish"
                        />
                        <CardContent>
                        <Typography variant="h5" color="text.secondary">
                           {price} $
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {description}
                          </Typography>
                        </CardContent>
                        </Link>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites" onClick={()=>{dispatch(addToCart({ id, images, title, description, price, category }))}}>
                            <AddIcon />
                          </IconButton>
                          {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' &&
                          <IconButton aria-label="add to favorites" onClick={()=>{window.location.href="/updateProduct/"+id}}>
                            <UpdateIcon />
                          </IconButton>
                          }
                          {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' &&
                           < IconButton aria-label="add to favorites" onClick={()=>{
                            if(id!==undefined)
                            dispatch(deleteProduct({id:id}))
                            }}>
                           <DeleteOutlineIcon />
                         </IconButton>
                          }
                         
                       
                        </CardActions>
                       
                      </Card>
        ))}
       </Grid>
       </div>
    </>
  );
};

export default ProductsList;


/*

<ImageList>
                        {images!==undefined && images.map((image, index) => (
                        <ImageListItem key={index}>
                        <img src={image} alt={image} />
                        </ImageListItem>
                        ))}
                    </ImageList> 

                    */