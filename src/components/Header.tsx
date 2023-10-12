import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, BadgeProps, IconButton, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreateIcon from '@mui/icons-material/Create';


import { logoutUser } from '../store/user';
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

  let signButtonValue: any = loggedIn===true?<LogoutIcon />:<LoginIcon />;
 
  return (
    
    <AppBar position="fixed">
      <Toolbar style={toolbarStyle}>
        <div>
        <Typography  variant="h6">Real API Store</Typography>
        </div>
        <div>
        <IconButton aria-label="Home" onClick={()=>{
          window.location.href = "/";
        }}>
            <HomeIcon />
        </IconButton>
      
      <IconButton aria-label="Cart" onClick={()=>{
          window.location.href = "/cart";
        }}> 
        <StyledBadge badgeContent={totalQuantity.toString()} color="secondary">
          <ShoppingCartIcon />
             </StyledBadge>
        </IconButton>

        {loggedIn && 
        <IconButton aria-label="Create Product" onClick={()=>{
          if(loggedIn){
            window.location.href = "/createProduct";
          }
          
        }}>
            <CreateIcon />
        </IconButton>
        }
        {loggedIn && 
        <IconButton aria-label="User Profile"  onClick={()=>{
          if(loggedIn){
            window.location.href = "/userProfile";
          }
          
        }}>
            <AccountBoxIcon />
        </IconButton>
        }
        <IconButton color="inherit" onClick={()=>{
          if(loggedIn){
            dispatch(logoutUser())
            window.location.href = "/signin";
          }else{
            window.location.href = "/signin";
          }
          
        }}>
            {signButtonValue}
        </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
