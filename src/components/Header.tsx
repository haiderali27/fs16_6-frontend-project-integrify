import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logoutUser } from '../store/user';
import { Badge, BadgeProps, IconButton, styled } from '@mui/material';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user: {loggedIn } } = useSelector((state: RootState) => state);
  const { cart: {totalQuantity } } = useSelector((state: RootState) => state);

  let signButtonValue:string = loggedIn===true?"Sign Out":"Sign In";
 
  return (
    
    <AppBar position="fixed">
      <Toolbar style={toolbarStyle}>
        <Typography  variant="h6">Real API Store</Typography>
      <Button color="inherit" onClick={()=>{
          window.location.href = "/";
        }}>
            Home
        </Button>
      
      <Button color="inherit" onClick={()=>{
          window.location.href = "/products";
        }}>
            Products
        </Button>
        <IconButton aria-label="cart" onClick={()=>{
          window.location.href = "/cart";
        }}> 
        <StyledBadge badgeContent={totalQuantity.toString()} color="secondary">
          <ShoppingCartIcon />
             </StyledBadge>
        </IconButton>

        {loggedIn && 
        <Button color="inherit" onClick={()=>{
          if(loggedIn){
            window.location.href = "/createProduct";
          }
          
        }}>
            CreateProduct
        </Button>
        }
        {loggedIn && 
        <Button color="inherit" onClick={()=>{
          if(loggedIn){
            window.location.href = "/userProfile";
          }
          
        }}>
            UserProfile
        </Button>
        }
        <Button color="inherit" onClick={()=>{
          if(loggedIn){
            dispatch(logoutUser())
            window.location.href = "/signin";
          }else{
            window.location.href = "/signin";
          }
          
        }}>
            {signButtonValue}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
