import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";


import {Button, ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import  { deleteProduct, getSingleProduct } from "../store/products";
import { addToCart } from "../store/cart";




const Product = () => {
  const {id}  = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { user: { currentUser } } = useSelector((state: RootState) => state);


  const { products:{product}} = useSelector((state: RootState) => state);
    const prod = product;
    let searchId: string = id||"";
 
    useEffect(() => {
      dispatch(getSingleProduct(searchId))
    }, [dispatch, searchId]);

    const handleAddToCart = () => {
      dispatch(addToCart(prod));
  };
  if (!prod || !prod.images || !prod.id) {
    return null;
  }
  return (

    <div>
     <Card key={id} style={{ margin: '90px' }}>
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
                        <img src={image} alt={image}/>
                        </ImageListItem>
                        ))}
                    </ImageList>
                    <Button onClick={handleAddToCart} variant="outlined">Add To Cart</Button>
                    {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' &&  <Button onClick={()=>{
                      window.location.href="/updateProduct/"+prod.id
                    }} variant="outlined">UpdateProduct</Button>}
                    {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' &&  <Button onClick={()=>{
                      if(prod.id!==undefined)
                      dispatch(deleteProduct({id:prod.id}))
                    }} variant="outlined">Delete Product</Button>}
                    </Card>              
    </div>
  );
};

export default Product;