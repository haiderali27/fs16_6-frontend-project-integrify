import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";
import {Button, ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';




import products, { getSingleProduct } from "../store/products";
import { getProducts } from "../store/products";
import { addToCart } from "../store/cart";




const Product = () => {
  const {id}  = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);


  const { products:  product  } = useSelector((state: RootState) => state);
    const prod = product.product;
    let searchId: string = id||"";

    useEffect(() => {
      dispatch(getSingleProduct(searchId));
    }, [dispatch]);

    const handleAddToCart = () => {
      //console.log('product: ', prod)
      dispatch(addToCart(prod));
      //console.log('########',cartItems);
  };
  return (
    <div>
     <Card key={id} style={{ margin: '10px' }}>
                        <CardHeader
                            title={prod.title}
                        />
                    <CardContent>
                        <Typography variant="h2" component="h1">
                            Price: {prod.price}$
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {prod.description}
                        </Typography>
                    </CardContent>
                    <ImageList>
                        {prod.images.map((image, index) => (
                        <ImageListItem key={index}>
                        <img src={image} alt={`Image ${index}`} />
                        </ImageListItem>
                        ))}
                    </ImageList>
                    </Card>
                    <Button onClick={handleAddToCart} variant="outlined">Add To Cart</Button>
    </div>
  );
};

export default Product;