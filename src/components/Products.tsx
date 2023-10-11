import { Link } from "react-router-dom";
import {Grid, ImageList, ImageListItem} from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';



import { Product } from "../types/types";
const initialStateProduct: Product ={
    id:0,
    title:"",
    price:0,
    description:"",
    images:[],
    category:{
      id:0,
      name:"",
      image:"",
      creationAt:"",
      updatedAt:"",
    },
    creationAt:"",
    updatedAt:""
  }
  

const divStyle = {
    overflow:'auto',
    color: 'blue',
    display: 'flex',
    justifyContent: 'center'

  };

const ProductsList = ({ products = [initialStateProduct]}) => {
    
  const list = products;

  return (
    
    <>
    <div style={divStyle}>
        <Grid container>
      
            {list.map(({ id, images, title, description, price, category }: Product) => (
                <Link to={`/product/${id}`} key={id}>
                    <Card key={id} style={{ width: '400px', height: '400px', margin: '10px' }}>
                        <CardHeader
                            title={title}
                            subheader={category && category.name}
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
                        {images!==undefined && images.map((image, index) => (
                        <ImageListItem key={index}>
                        <img src={image} alt={image} />
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


