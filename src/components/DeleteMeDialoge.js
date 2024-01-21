import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {baseUrl} from "../utils/constant";
import { setIsLogin } from "../utils/redux/authSlice";
import { useNavigate } from "react-router-dom";


const DeleteMeDialoge = ({ open, setOpen}) => {
  const dispatch=useDispatch();
  const {name,email}=JSON.parse(window.localStorage.getItem("userInfo"));
  const isLogin=useSelector(store=>store.auth.isLogin);
  const token=window.localStorage.getItem("token");
  const navigate=useNavigate();

  // function to make api call to delete the account
  const deleteAccount = async () => {  
      const body = {
        name,
        email,
      };

      const apiUrl = baseUrl + "/api/v1/user/deleteMe";
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          projectId:"fio1831j50s3",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();

      if (response.ok) {
        logout();
        toast.error("Your Account is Deleted.");
      }else{
        toast.error(jsonData.message);
      }
  };

  const logout=()=>{
    dispatch(setIsLogin(false));
  }

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  React.useEffect(()=>{
    if(!isLogin){
      navigate("/",{ replace: true });
    }
  },[isLogin])

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete My Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting your account will result in permanent loss of access,
            including order history and wishlist. Your account data and
            preferences will be irrecoverable.
          </DialogContentText>
          <Alert sx={{ margin: "1rem 0" }} severity="error">
            Are you sure you want to delete your account?
          </Alert>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={deleteAccount}  color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteMeDialoge;
