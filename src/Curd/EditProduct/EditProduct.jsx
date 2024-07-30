import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { product_update, product_edit } from "../../Redux/cartSlice";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import "./EditProduct.css"
const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(product_edit(id));
  }, [id]);

  const { product } = useSelector((state) => state.productt);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append('id', id);

    dispatch(product_update(formData)).then(() => {
      alert('Edit successful');
      navigate("/showproduct");
    });
  };

  return (
    <Box className='box3'>
      <Box className='box4'>
        <Typography variant="h4" mb={2} align="center">Edit Product</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                {...register("description", { required: "Description is required" })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default EditProduct;
