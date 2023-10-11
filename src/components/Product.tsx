import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";


import {Button, ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import  { deleteProduct, getSingleProduct, refreshProductDeleted } from "../store/products";
import { addToCart } from "../store/cart";




const Product = () => {
  const {id}  = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { user: { currentUser } } = useSelector((state: RootState) => state);


  const { products:{product, productDeleted}} = useSelector((state: RootState) => state);
    const prod = product;
    let searchId: string = id||"";
 
    useEffect(() => {
      dispatch(getSingleProduct(searchId))
      if(productDeleted){
         dispatch(refreshProductDeleted())
         window.location.href="/"
      }
    }, [dispatch, productDeleted]);

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
                    {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' &&  <Button onClick={()=>{
                      window.location.href="/updateProduct/"+prod.id
                    }} variant="outlined">UpdateProduct</Button>}
                    {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' &&  <Button onClick={()=>{
                      dispatch(deleteProduct({id:prod.id}))
                    }} variant="outlined">Delete Product</Button>}
        
    </div>
  );
};

export default Product;