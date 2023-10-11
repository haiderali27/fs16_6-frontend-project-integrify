import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { createUser } from '../store/user';
import { MenuItem, Select } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const dispatch: AppDispatch = useDispatch();
  const { user: { currentUser, loggedIn } } = useSelector((state: RootState) => state);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedOption, setSelectedOption] = useState('customer');
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(event.target.value);
  };
  const onSubmit =() => {
    dispatch(createUser({email:email, name:name, password:password, avatar:avatar, role:selectedOption}))
  }
  const handleChange = (event:any) => {
    setSelectedOption(event.target.value);
  };
  if(loggedIn){
    window.location.href = "/";
    }
  useEffect(() => {

    if(loggedIn){
        window.location.href = "/";
    }
  }, [dispatch, currentUser, loggedIn]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleName}
                />
              </Grid>  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="avatar"
                  label="avatar"
                  type="avatar"
                  id="avatar"
                  autoComplete="avatar"
                  onChange={handleAvatar}

                />
              </Grid>
            </Grid>
              <Container>
              <Select
              value={selectedOption}
              onChange={handleChange}
              label="Select an option">
              <MenuItem value="">
                <em>Select an option</em>
              </MenuItem>
                <MenuItem key="admin" value="admin">
                  Admin
                </MenuItem>
                <MenuItem key="customer" value="customer">
                  Customer
                </MenuItem>
              
            </Select>
                  </Container>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
            >
              Sign Up
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}