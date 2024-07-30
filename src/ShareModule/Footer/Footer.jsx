import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import "./Footer.css"
import logo from "../../Assets/Logo-removebg-preview.png"
const Footer = () => {
  return (
    <Box className='footer'>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h6" component="div">
          <span className='span'>Trend</span>
          <span>Haven</span><span className='dot'>.</span>
          
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address: Kestopur,Mission Bazar,SaltLake
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Contact: panchananpal13@gmail.com
          </Typography>
        </Grid>

        {/* Center */}
        <Grid item xs={12} md={4} textAlign="center">
        <Typography variant="h6" component="div">
        <img src= {logo}/>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Follow us on social media
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Facebook | Twitter | Instagram
          </Typography>
        </Grid>

        {/* Right Side */}
        
      </Grid>
      <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © 2024 <span className='span'>Trend</span>
            <span>Haven</span><span className='dot'>.</span>. All rights reserved.            Privacy Policy | Terms of Service
          </Typography>
          <Typography variant="body2" color="textSecondary">
          </Typography>
        </Grid>
    </Box>
    
  );
};

export default Footer;
