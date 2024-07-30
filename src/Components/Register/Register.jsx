import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { registerUser } from '../../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./Register.css"
const Register = () => {
  const { upload_status, registrationError } = useSelector((state) => state.contents);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    if (file) {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('profile_pic', file);
      formData.append('email', data.email);
      formData.append('password', data.password);

      dispatch(registerUser(formData)).then(() => {
        if (upload_status === 'success') {
          navigate('/login');
        }
      });
    }
  };

  return (
    <Box className='register'>
      <Box className='grid'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" padding={2} textAlign={'center'}>
            Sign Up
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="First Name"
                {...register('first_name', { required: 'Enter first name' })}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="Last Name"
                {...register('last_name', { required: 'Enter last name' })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                label="Email"
                {...register('email', {
                  required: 'Enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Wrong input',
                  },
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
                {...register('password', { required: 'Enter password' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                accept="image/*"
                onChange={handleUpload}
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
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
