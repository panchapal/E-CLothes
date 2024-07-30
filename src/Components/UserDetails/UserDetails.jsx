// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserDetails } from '../../Redux/authSlice';
// import { Container, Typography, Grid, CircularProgress, Paper, TextField, Box } from '@mui/material';
// import "./UserDetails.css"
// import profile_Url from '../../Helper/Helper';
// const UserDetails = () => {
//   const dispatch = useDispatch();
//   const { userDetails, upload } = useSelector((state) => state.contents);
  
//   useEffect(() => {
//     dispatch(fetchUserDetails());
//   }, [dispatch]);

//   if (upload === 'loading') {
//     return (
//       <Container
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (upload === 'failed' || !userDetails) {
//     return (
//       <Container
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <Typography variant="h6" color="error">
//           Failed to load user details
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Box
//       className='content6' >
//       <Paper elevation={3} className='paper'>
//         <Typography variant="h4" gutterBottom align="center">
//           User Details
//         </Typography>
        
//         <Grid container spacing={2} justifyContent="center">
        
//         <img
//                 src={profile_Url}
//                 alt="Profile"
//                 width="50"
//                 height={50}
//                 style={{ borderRadius: '50%' }}
//               />
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="First Name"
//               value={userDetails.first_name}
//               InputProps={{ readOnly: true }}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Last Name"
//               value={userDetails.last_name}
//               InputProps={{ readOnly: true }}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Email"
//               value={userDetails.email}
//               InputProps={{ readOnly: true }}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={12} container justifyContent="center">             
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default UserDetails;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../Redux/authSlice';
import { Container, Typography, Grid, CircularProgress, Paper, TextField, Box } from '@mui/material';
import profile_Url from '../../Helper/Helper';
import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { userDetails, upload } = useSelector((state) => state.contents);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  if (upload === 'loading') {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (upload === 'failed' || !userDetails) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          Failed to load user details
        </Typography>
      </Container>
    );
  }

  const profilePicUrl = profile_Url(userDetails.profile_pic);

  return (
    <Box className='content6'>
      <Paper elevation={3} className='paper'>
        <Typography variant="h4" gutterBottom align="center">
          User Details
        </Typography>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {userDetails.profile_pic && (
            <Grid item xs={12} container justifyContent="center">
              <img
                src={profilePicUrl}
                alt="Profile"
                width="100"
                height="100"
                style={{ borderRadius: '50%' }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              value={userDetails.first_name}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={userDetails.last_name}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={userDetails.email}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserDetails;
