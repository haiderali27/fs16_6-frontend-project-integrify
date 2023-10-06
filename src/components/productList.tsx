import React from "react";
import { Link } from "react-router-dom";
import {Grid, ImageList, ImageListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
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


import { Product } from "../types/types";

const divStyle = {
    overflow:'auto',
    color: 'blue',
    display: 'flex',
    justifyContent: 'center'

  };

const ProductsList = ({ products = []}) => {
    
  const list = products;

  return (
    
    <>
    <div style={divStyle}>
        <Grid container>
            {list.map(({ id, images, title, description, price, category: { name } }: Product) => (
                <Link to={`/product/${id}`} key={id}>
                    <Card key={id} style={{ width: '400px', height: '400px', margin: '10px' }}>
                        <CardHeader
                            title={title}
                            subheader={name}
                        />
                    <CardContent>
                        <Typography variant="h2" component="h1">
                            Price: {price}$
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                    <ImageList>
                        {images.map((image, index) => (
                        <ImageListItem key={index}>
                        <img src={image} alt={`Image ${index}`} />
                        </ImageListItem>
                        ))}
                    </ImageList> 
                    </Card>
                </Link>
        ))}
       </Grid>
       </div>
    </>
  );
};

export default ProductsList;


