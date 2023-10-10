import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { styled } from '@mui/material/styles';
import CartComponent from "../components/cartComponent";

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));




const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div>
      <Div>{"Your Shopping Cart: "}</Div>;
        
        {cartItems.map(product => (
            <CartComponent key={product.product.id} product={product.product} quantity={product.quantity} />
        ))}
  
    </div>
  );
};

export default CartItems;