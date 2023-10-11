import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import AddIcon from '@mui/icons-material/Add';
import {Product} from "../types/types";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addToCart } from "../store/cart";


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

  
  return (
    
    <>
    <div style={divStyle}>
        <Grid container>
      
            {list.map(({ id, images, title, description, price, category }: Product) => (
              images!==undefined&&
                
                    <Card key={id} sx={{ maxWidth: 345 }}>
                    <Link to={`/product/${id}`} key={id}>
                    <CardHeader
                    avatar={
                                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    image={images[0]}
                                  </Avatar>
                              }
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
                        <Typography variant="body2" color="text.secondary">
                           Price: {price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {description}
                          </Typography>
                        </CardContent>
                        </Link>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites" onClick={()=>{dispatch(addToCart({ id, images, title, description, price, category }))}}>
                            Add to Cart <AddIcon />
                          </IconButton>
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