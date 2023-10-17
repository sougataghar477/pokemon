import { useState } from 'react';
import useStore from './Store';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import { Stack } from '@mui/material';
import Switch from '@mui/material/Switch';
import {Button} from '@mui/material';
import { nanoid } from 'nanoid';
function OrderModal({handleClose,open}){

  const addItem=useStore((state) => state.addItem);
  const [selectedItem, setItem] = useState("Poke Ball");
  const [itemPrice,setPrice]=useState(0);
  function resetState(){
    setItem("Poke Ball");
    setPrice(0);
    setChecked(false);
    setQuantity(0);
  }
  const handleChange = (event) => {
    setItem(event.target.value);
    calculatePrice(event.target.value,quantity,checked);

  };
  function calculatePrice(item,quantity,isBag){
    let a=0;
    // console.log(item,quantity);
    switch(item) {
      case 'Poke Ball':
        // code block
        a=(5*quantity);
        break;
      case 'Great Ball':
        // code block
        a=(10*quantity);
        break;
      case 'Super Potion':
        a=(10*quantity);
        break;
      case 'Hyper Potion':
        a=(20*quantity);
        break;    
      default:
        // code block
    }
    console.log(a);
    if(isBag===true){
      setPrice(a+2);
    }
    else{
      setPrice(a)
    }
  }
  const [checked, setChecked] = useState(false);
  const [quantity,setQuantity]=useState(0)
 
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
  const getText = (value) => `${value}`;
   return <Modal
   open={open}
   onClose={handleClose}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
 >
   <Box sx={style}>
     <Typography id="modal-modal-title" variant="h3" component="h1" sx={{color:'red',textAlign:"center"}}>
       Place Your Order
     </Typography>
     <Typography id="modal-modal-description" sx={{ mt: 2,fontWeight:'bold',textAlign:"center" }}>
       We'll use this info to pack your order.
     </Typography>
     <FormControl fullWidth sx={{marginTop:'32px'}}>
              <InputLabel id="demo-simple-select-label">Choose Item</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedItem}
                label="Age"
                onChange={handleChange}
              >
                {['Poke Ball','Great Ball','Super Potion','Hyper Potion'].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
            <Slider
            aria-label="Small steps"
            value={quantity}
            onChange={e=> {setQuantity(e.target.value);calculatePrice(selectedItem,e.target.value,checked)}}
            sx={{
               marginTop: '32px',color:'red'
            }}
            step={1}
            // marks
            min={0}
            max={10}
            valueLabelDisplay="auto"
            getAriaValueText={getText}
          />
          <Typography sx={{fontWeight:"bold"}}>Select Quantity</Typography>
          <Stack direction="row" sx={{alignItems:"center",marginTop:'32px',justifyContent:"space-between"}}>
            <Typography>I need a bag for that</Typography>
            <Switch
            sx={{accentColor:'red'}}
      checked={checked}
      onChange={e => {console.log(e.target.checked);setChecked(e.target.checked);
        calculatePrice(selectedItem,quantity,e.target.checked)
      }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
          </Stack>
          <Stack direction="row" sx={{alignItems:"center",marginTop:'32px',justifyContent:"space-between"}}>
            <Typography>Cost</Typography>
            <Typography>${itemPrice}</Typography>

          </Stack>
          <Typography></Typography>
          <Button variant='contained' sx={{margin:'auto',display:'block',background:'red',color:'white'}} 
          disabled={quantity>0?false:true}
          onClick={()=>{ addItem({id:nanoid(),selectedItem:selectedItem,quantity:quantity,itemPrice:itemPrice,isBag:checked});
          resetState();
          handleClose()}}
          >ADD TO CART</Button>
   </Box>
 </Modal> 
}
export default OrderModal;