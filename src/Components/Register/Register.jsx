import React, { useState} from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { registerUser } from '../../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./Register.css"
import { useMutation } from "@tanstack/react-query";
import imgp from "../../Assets/forest-7922999.jpg"
const Register = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [imgName, setImageName] = useState("");
  const dispatch = useDispatch();
  const { redirectContact } = useSelector((state) => state.contents);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  // React Query mutation
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const resultAction = await dispatch(registerUser(formData));
      return resultAction.payload;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        // Successful registration
        if (data?.data?.email) {
          localStorage.setItem("email", data.data.email);
          navigate("/login");
        } else {
          console.error("Email not found in response", data);
        }
      } else if (data?.status === 409) { // Assuming 409 Conflict for existing email
        // Handle email already exists
        console.error("Email already exists");
        alert("Email already registered. Please use a different email.");
      } else {
        console.error("Unexpected success response", data);
      }
    },
    onError: (error) => {
      console.error("Signup failed", error);
    },
  });

  const handleUpload = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImg(file);
      setImageName(file.name);
    }
  };

  const onSubmit = (data) => {
    let formdata = new FormData();
    formdata.append("first_name", data.first_name);
    formdata.append("last_name", data.last_name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("profile_pic", img);
    mutation.mutate(formdata);
  };

  // useEffect(() => {
  //   if (mutation.isSuccess) {
  //     // No need to navigate here, as it's already handled in onSuccess
  //   }
  // }, [mutation.isSuccess, navigate, redirectContact]);

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
                disabled={mutation.isLoading}
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
