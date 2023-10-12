import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartComponent from "../components/Cart";
import { CSSProperties } from "styled-components";
import { Grid } from "@mui/material";




const divStyle:CSSProperties = {
  display: 'flex',
  margin:'100px',
  justifyContent:'space-around'

};

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    
    <div style={divStyle}>   
     <Grid container spacing={2} justifyContent="center" marginTop='50px'>      
        {cartItems.map(product => (
            <CartComponent key={product.product.id} product={product.product} quantity={product.quantity} />
        ))}
    </Grid>
    </div>
  );
};

export default CartItems;