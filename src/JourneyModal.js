import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function JourneyModal({handleJourneyModaClose,open,codeName,fullName,distance,region,pokemon,totalItemPrice,itemsData}){
  // console.log(Array.isArray(items));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 8,
      }; 
    return <Modal
    open={open}
    onClose={handleJourneyModaClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h4" component="h4" sx={{color:'red',textAlign:"center"}}>
        Collected Data
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>
        Full Name: {fullName}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>
        Code Name: {codeName}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>
        Region: {region}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>
        Distance: {distance}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>
        Pokemon: {pokemon}
      </Typography>
      {/* <Typography sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>Price: {totalItemPrice}</Typography> */}
    </Box>
  </Modal>
}
export default JourneyModal;