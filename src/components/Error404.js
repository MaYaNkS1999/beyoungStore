import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import errorImage from "../assets/Error404.jpg";
import { useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  };

const Error404 = () => {
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/")
  };
  return (
    <div>
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img style={{width:'100%',borderRadius:'20px'}} src={errorImage} alt="page-unavailable" />
      </Box>
    </Modal>
  </div>
  )
}

export default Error404