import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';


const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

const Header = () => {
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

        <Button color="inherit">
            <ShoppingCartIcon style={{ marginRight: '5px' }} />
            Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
