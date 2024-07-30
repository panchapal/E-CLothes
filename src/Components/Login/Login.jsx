import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { logIn } from '../../Redux/authSlice';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const {upload_status } = useSelector((state) => state.contents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(logIn(data)).then(() => {
      if (upload_status === 'success') {
        // navigate('/');
      }
      RedirectLog();
    });
  };

  const RedirectLog = () => {
    let token = localStorage.getItem("token");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/login";
    if (token !== null && token !== undefined && token !== "") {
      isInLoginPage && navigate("/");
    }
  };

  // useEffect(() => {
  //   // RedirectUser();
  // }, [redirectContact]);

  return (
    <Box className='content1'>
      <Box className='grid1'>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Typography variant="h4" padding={3} textAlign={'center'}>
          Sign In
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                label="Email"
                {...register('email', { 
                  required: 'Email address is required', 
                  pattern: { 
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                    message: 'Invalid email address' 
                  } 
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                label="Password"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, borderRadius: 3 }}
              >
                Login
              </Button>
              <Typography variant='h6'>Not Sign Up?<Button color="info" variant="text" component={Link} to="/register" sx={{ margin: 2 }}>Sign Up</Button>
</Typography>

            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;


