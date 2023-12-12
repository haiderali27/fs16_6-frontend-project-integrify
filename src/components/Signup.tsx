import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { createUser } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';


export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const dispatch: AppDispatch = useDispatch();
  const { user: { currentUser, loggedIn, registerFailed} } = useSelector((state: RootState) => state);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [avatarError, setAvatarError] = useState('');

  const validatePassword = () => {
    if (password === '') {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError('');
    }
  };


  const validateUrl = () => {
    // URL validation regex (a simple one, you may want to adjust it based on your requirements)
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (avatar.trim() !== '' && !urlRegex.test(avatar)) {
      setAvatarError('Invalid URL');
    } else {
      setAvatarError('');
    }
  };

  const validateEmail = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

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
    dispatch(createUser({email:email, name:name, password:password, avatar:avatar}))
    setSubmitted(true)
  }
  const [submitted, setSubmitted] = useState(false);

  const [registerFailedd, setRegisterFailedd] = useState(registerFailed);

  const handleCloseSnackbar = () => {
    setRegisterFailedd(false);
  };

  if(loggedIn){
    //window.location.href = "/";
    navigate('/')
    }
  useEffect(() => {

    if(loggedIn){
        //window.location.href = "/";
        navigate('/')
        return
    }
    if(registerFailed&&submitted){
      setRegisterFailedd(true)
      const timer = setTimeout(() => {
        setRegisterFailedd(false);
      }, 3000);


      setSubmitted(false)
      return () => clearTimeout(timer);

    }
  }, [dispatch, currentUser, loggedIn, navigate, submitted, registerFailed, registerFailedd]);
  return (

      <Container component="main" maxWidth="xs" style={{ marginTop: '80px' }}>
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={registerFailedd}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Signup failed. Please try again.
        </Alert>
      </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>

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
                  onBlur={validateEmail}
                  error={Boolean(emailError)}
                 helperText={emailError}
                 autoFocus

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
                  onInput={handlePassword}
                  onBlur={validatePassword}
                  error={Boolean(passwordError)}
                  helperText={passwordError}

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
                  onBlur={validateUrl}
                  error={Boolean(avatarError)}
                  helperText={avatarError}

                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
              disabled={Boolean(emailError) || Boolean(passwordError) || Boolean(avatarError)}
            >
              Sign Up
            </Button>

          </Box>
        </Box>
      </Container>
  );
}