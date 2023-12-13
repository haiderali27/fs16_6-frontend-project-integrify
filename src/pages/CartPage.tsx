import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CSSProperties } from "styled-components";
import SpanningTable from "../components/CartTable";


const mainStyle:CSSProperties = {
  margin:'100px',

};



const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div style={mainStyle}> 
      <SpanningTable items={cartItems} />
    </div>
  );
};


/*
const divStyle:CSSProperties = {
  display: 'flex',
  margin:'100px',
  justifyContent:'space-around'

};
    <div style={divStyle}>   
     <Grid container spacing={2} justifyContent="center" marginTop='50px'>      
        {cartItems.map(product => (
            <CartComponent key={product.product.id} product={product.product} quantity={product.quantity} />
        ))}
    </Grid>
    </div>
*/
export default CartItems;