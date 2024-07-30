import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button } from "@mui/material";
import { product_create } from "../../Redux/cartSlice";
import "./CreateProduct.css"

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = React.useState(null);

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", image);
        
        dispatch(product_create(formData)).then(() => {
            navigate("/showproduct");
        });
    };

    return (
        <Box className='productt'>
           
            <form onSubmit={handleSubmit(onSubmit)} className="formm">
            <Typography variant="h4" gutterBottom>
                Add Product
            </Typography>
                <TextField
                    margin="normal"
                    type="text"
                    variant="outlined"
                    placeholder="Title"
                    fullWidth
                    {...register('title', { required: 'Title is required' })}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                />
                
                <TextField
                    margin="normal"
                    type="text"
                    variant="outlined"
                    placeholder="Description"
                    fullWidth
                    {...register('description', { required: 'Description is required' })}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                />
                
                <TextField
                    type="file"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleUpload}
                />
                
                <Button 
                fullWidth
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 3, borderRadius: 3 }}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CreateProduct;
