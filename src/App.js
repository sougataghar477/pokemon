import useStore from './Store';
import logo from './logo.svg';
import OrderModal from './OrderModal';
import './App.css';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import JourneyModal from './JourneyModal';
function App() {
  const items = useStore((state) => state.items);
  let b=0;
  const totalPrice=items.forEach(item => b=b+item.itemPrice);
  const [fullName,setFullname]=useState("");
  // console.log(fullName.length)
  const [codeName,setCodename]=useState("");
  const [distance,setDistance]=useState(0);
  const removeItem = useStore((state) => state.removeItem);
  const [picIndex,setpicIndex]=useState(0);
  const [region, setRegion] = useState("Kanto");
  const [open, setOpen] = useState(false);
  const [journeyModalOpen,setJourneyModalOpen]=useState(false);
  const handleJourneyModalOpen=() => setJourneyModalOpen(true);
  const handleJourneyModaClose=() => setJourneyModalOpen(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = createTheme({
    palette: {
      secondary: {
        main: '#ff0000', // Replace with your desired accent color
      },
    },
  });
 console.log(items)
  const handleChange = (event) => {
    console.log(event.target.value)
    setRegion(event.target.value);

  };
  let pokemons = {
    Kanto: [
      {name:'Bulbasaur',img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"},
      {name:"Charmander",img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'},
      {name:'Squirtle',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png'}],
    Jhoto: [{name:'Chikorita',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/152.png'},
      {name:'Cyndaquil',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/155.png'},
      {name:'Totodyle',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/158.png'}],
    Hoenn: [{name:'Treeko',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/252.png'},
      {name:'Torchik',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/255.png'},
      {name:'Mudkip',img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/258.png'}]
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ThemeProvider theme={theme}>

        <Box
          mx={'auto'}
          sx={{
            width: 360,p:4,boxShadow:'1px 1px 3px 0px black',margin:'32px'
          }}
        >
          <Typography variant="h4" component="h2" sx={{color:'red',textAlign:"center"}}>Fill This Form</Typography>
          <TextField mx={'auto'}
          error={fullName.length<3?true:false} 
          helperText={fullName.length<3?"Please enter more than 3 letters":''}
          value={fullName}
          onInput={e => setFullname(e.target.value)}
            sx={{
              width: 300, margin: '16px', color: 'red'
            }} id="filled-basic" label="Full Name" variant="filled" />
          <TextField mx={'auto'}
            error={codeName.length<3?true:false} 
          onInput={e => setCodename(e.target.value)}

            helperText={codeName.length<3?'Please enter more than 3 letters':''}
            value={codeName}
            sx={{
              width: 300, margin: '16px'
            }} id="filled-basic" label="Code Name" variant="filled" />
          <Slider
          value={distance}
            aria-label="Small steps"
            onChange={e => setDistance(e.target.value)}
            defaultValue={1}
            sx={{
              width: 300, margin: '16px',color:'red'
            }}
            step={1}
            // marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
          <Box sx={{ width: 300, margin: '16px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">What's your starting region?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={region}
                label="REGION"
                onChange={handleChange}
              >
                {["Kanto", "Jhoto", "Hoenn"].map(region => <MenuItem key={region} value={region}>{region}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Stack direction="row" spacing={5}>

          {pokemons[region].map((pokemon,index) => <Avatar onClick={()=> {setpicIndex(index);console.log(pokemons[region][index].name)}}  sx={{width:'80px',height:'80px',backgroundColor:'gray',border:picIndex===index?'3px solid red':'0px solid red'}} src={pokemon.img}/>)}
          </Stack>
          <Stack sx={{justifyContent:'space-between',alignItems:"center",marginTop:'32px'}} direction="row" spacing={2}>
          <h3>What do you want to pack ?</h3>
  
          <AddCircleIcon onClick={handleOpen} sx={{fill:'red',height:'2em',width:'2em'}}/>
 
</Stack>
      <OrderModal handleClose={handleClose} open={open}/>
      {items.map(item => <Chip
      sx={{margin:'8px'}}
              color={item.isBag?'primary':'default'}
              label={item.quantity===1?item.quantity+' '+item.selectedItem:item.quantity+' '+item.selectedItem+'s'}
              onDelete={()=>removeItem(item.id)}
               
            />)}
            <Stack sx={{alignItems:"center",marginTop:'32px',justifyContent:'space-between'}} direction="row">
              <Typography>Total Cost</Typography>
              <Typography>${b}</Typography>
            </Stack>
            <Button onClick={handleJourneyModalOpen} variant='contained' sx={{margin:'auto',display:'block',background:'red',color:'white'}}>START MY JOURNEY</Button>
          <JourneyModal
           codeName={codeName}
           fullName={fullName}
           region={region}
           distance={distance}
           pokemon={pokemons[region][picIndex].name}
           handleJourneyModaClose={handleJourneyModaClose} 
           open={journeyModalOpen}
           itemsData={items}
           totalItemPrice={b}/>
           
        </Box>

      </ThemeProvider>

    </div>
  );
}

export default App;
