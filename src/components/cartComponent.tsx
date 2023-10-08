import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../store/cart'
import { Product } from '../types/types';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartComponent: React.FC<{ product: Product, quantity:number }> = ({ product, quantity }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    return (
        <div>
            <Card key={product.id} style={{ width: '200px', height: '300px', margin: '10px' }}>
                        <CardHeader
                            title={product.title}
                        />
                           <CardContent>
                        <Typography variant="body2" color="text.secondary">
                           Price: {product.price} $
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           Quantity: {quantity}
                        </Typography>
                    </CardContent>
                    <Button variant="outlined" onClick={handleAddToCart}><AddIcon /></Button>
                    <Button variant="outlined" onClick={handleRemoveFromCart}><RemoveIcon /></Button>
            </Card>  
        </div>
    );
};

export default CartComponent;