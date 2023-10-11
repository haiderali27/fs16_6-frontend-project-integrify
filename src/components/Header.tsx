import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logoutUser } from '../store/user';


const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user: {loggedIn } } = useSelector((state: RootState) => state);
  let signButtonValue:string = loggedIn===true?"Sign Out":"Sign In";
  return (
    
    <AppBar position="static">
      <Toolbar style={toolbarStyle}>
        <Typography  variant="h6">Real API Store</Typography>
        <Box>
            <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={()=>{}}
      /> <SearchIcon />
      </Box>
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
        <Button color="inherit" onClick={()=>{
          window.location.href = "/cart";
        }}>
            <ShoppingCartIcon style={{ marginRight: '5px' }} />
            Cart
        </Button>

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
