import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { product_get, product_delete } from "../../Redux/cartSlice";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import "./ShowProduct.css"
// import SweetAlertComponent from "../../SweetAlert/SweetAlert"
import SweetAlert from "react-bootstrap-sweetalert";
const ShowProduct = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.productt);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(product_get());
  }, [dispatch]);

  const handleDelete = () => {
    if (deleteId !== "") {
      dispatch(product_delete({ id: deleteId })).then(() => {
        dispatch(product_get());
      });
    }
    setDeleteId("");
    setIsDelete(false);
  };

  return (
    <>
      <Grid container spacing={2} sx={{paddingBottom:16}}>
        {list?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id} >
            <Card className="car">
              <CardHeader title={item.title} sx={{ textAlign: 'center' }} />
              <CardContent className="con">
                <Typography>{item.description}</Typography>
                <CardMedia>
                  <img
                    src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`}
                    height={250}
                    width={300}
                    alt={item.title}
                    style={{ marginTop: '6px',borderRadius:6 }}
                  />
                </CardMedia>
              </CardContent>
              <Box display="flex" justifyContent="space-between" p={2}>
                <Link
                  to=""
                  onClick={() => {
                    setDeleteId(item?._id);
                    setIsDelete(true);
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    Delete
                  </Button>
                </Link>
                {isDelete && (
                  <SweetAlert
                    warning
                    showCancel
                    // style={{zIndex:1}}
                    title="Are you sure?"
                    subtitle={"You will not able to recover"}
                    cancelBtnStyle={{backgroundColor:'red',padding:10 ,textDecoration:'none',color:'white'}}
                    confirmBtnStyle={{ backgroundColor: "#024b98",padding:10 ,textDecoration:'none',color:'white' }}
                    onConfirm={handleDelete}
                    onCancel={() => setIsDelete(false)}
                  >
                    You will not be able to recover this imaginary file!
                  </SweetAlert>
                )}
                <Link to={`/Edit/${item?._id}`}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="primary"
                  >
                    Edit
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShowProduct;
