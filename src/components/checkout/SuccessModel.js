import { Box, Modal } from '@mui/material'
import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccessModel } from '../../utils/redux/checkoutSlice';
import { baseUrl } from '../../utils/constant';

const SuccessModel = () => {
    const showSuccessModal=useSelector(store=>store.checkout.showSuccessModel);
    const token=window.localStorage.getItem("token");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
       
        boxShadow: 24,
        p: 4,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        gap:'1rem',
        '@media (max-width: 450px)': {
            width: '90%', 
          },
          
      };
      const btnStyle={
        alignItems: 'center',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            fontWeight: 610,
            justifyContent: 'center',
            padding: '1rem 0',
            width: '100%',
            backgroundColor:"black",
            color:"white"
      }
      const clearWholeCart =async () => {
        const apiUrl = baseUrl + `/api/v1/ecommerce/cart`;
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            projectId: "fio1831j50s3",
          },
        });
        const jsonData=await response.json();
      };
      const handleClick = ()=>{
        clearWholeCart();
        dispatch(updateSuccessModel(false));
        navigate('/')
    }
  return (
    <div>
        <Modal
          open={true}
          onClose={()=>dispatch(updateSuccessModel(false))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style}>
            <CheckCircleOutlineIcon style={{color:'green',fontSize:'5rem'}}/>
            <h5>Order placed succesfully</h5>
            <button onClick={handleClick} style={btnStyle}>Continue Shopping</button>
          </Box>
        </Modal>
      </div>
  )
}

export default SuccessModel