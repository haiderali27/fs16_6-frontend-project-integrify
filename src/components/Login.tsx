import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { login } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const dispatch: AppDispatch = useDispatch();
  const { user: { currentUser, loggedIn, logginFaled } } = useSelector((state: RootState) => state);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const validatePassword = () => {
    if (password === '') {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError('');
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
 
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit =() => {
    dispatch(login({email:email, password:password}))
    setSubmitted(true)
  }
  if(loggedIn){
    //window.location.href = "/";
    navigate("/");
    }
    const [submitted, setSubmitted] = useState(false);

    const [loggedInFailed, setLoggedInFailed] = useState(logginFaled);

    const handleCloseSnackbar = () => {
      setLoggedInFailed(false);
    };
  useEffect(() => {
    if(loggedIn){
        //window.location.href = "/";
        navigate("/");
        return
    }
    if (logginFaled&&submitted) {
    
      setLoggedInFailed(true)
      const timer = setTimeout(() => {
        setLoggedInFailed(false);
      }, 3000);
      setSubmitted(false)

      // Cleanup the timer when the component unmounts or loggedInFailed changes
      return () => clearTimeout(timer);
    }
    
  }, [dispatch, currentUser, loggedIn, navigate, loggedInFailed, logginFaled, submitted]);
  
  return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '80px' }} >
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={loggedInFailed}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Login failed. Please try again.
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
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete='password'
              onInput={handlePassword}
              onBlur={validatePassword}
              error={Boolean(passwordError)}
              helperText={passwordError}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Boolean(emailError) || Boolean(passwordError)}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Link href="/signup">
              Do not  have Account? Click here to Register
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}