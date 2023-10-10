import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";


import {Button, ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import products, { getSingleProduct } from "../store/products";
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