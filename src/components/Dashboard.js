//Project Internet of things Flima Air 
//@author Raeef Ibrahim
//Dashboard
import React, { useEffect,useState } from "react"
import { Card,Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Analytics from "./Analytics"
import AnalyticsBox from "./AnalyticsBox"
import { createMuiTheme, MuiThemeProvider, Switch} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import logo from "../assets/lake.jpg"
import fan from "../assets/fan.png"
import warning from "../assets/Warning.png"
import done from "../assets/done.png"
import axios from 'axios';
import '../style/Dashboard.css'
import PrimarySearchAppBar from "./PrimarySearchAppBar"

export default function Dashboard() {
  const [data, setData] = useState()
  const [id,setId]= useState();
  const [status,setStatus]= useState('ON');
  const[temperature, setTemperature] =useState();
  const[humidity, setHumidity] =useState();
  const[gasSensor, setGasSensor] =useState();

 
  const [state11, setState11] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  // Check switch status
  const handleChange = (event) => {
    setState11({ ...state11, [event.target.name]: event.target.checked });
     if(event.target.checked === true){
       setStatus('OFF')
     postData()
     } 
     if(event.target.checked === false || event.target.checked=== null ){
      setStatus('ON')
      postData()
      } 
  };
  // list style
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  // Dynamic air status window
  function DynamicGas() {
if (gasSensor > 500) {
    return <div class="row justify-content-center">
    <h4 className="text-center mb-4">CO2 is higher than 500</h4>  
      </div>;
  }else {
    return  <h4 className="text-center mb-4"></h4>  
  }

  }
   
    function CheckNull() {
      if ( typeof humidity === 'undefined') {
          return <h3 className="text-center mb-4">Sensor is offline</h3>;
        }else {
          return  <h4 className="text-center mb-4"></h4>  
        }
      
        }
// Dynamic air status window
  function DynamicText() {
    if (humidity > 70) {
      return <div class="row justify-content-center">
<h4 className="text-center mb-4">Humidity is higher than 70</h4>  
  </div>;
    } else {
      return  <h4 className="text-center mb-4"></h4>  
    }
  
    
  }
    const classes = useStyles();
    const [state, setState] = React.useState({  
      left: true,
    });

   // Dynamic air status window
    function Headline() {
      if (humidity > 70 || gasSensor > 500) {

        return <div class="row justify-content-center">
        <div className="col-lg-3"> 
     <img style={{maxWidth:120}}  src={warning}></img> 
    <DynamicText></DynamicText>
    <DynamicGas></DynamicGas>
</div>  
</div>;
      } else{
        return   <div class="row justify-content-center">
        <div className="col-lg-3"> 
    <img style={{maxWidth:120}}  src={done}></img> 
</div>  
  </div>;

      }
     
    }
// GET datasesnsor adn set in React hook
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'http://192.168.2.6:4200/datasensor',
        );
        setTemperature(result.data[0].temperature)
        setHumidity(result.data[0].humidity)
        setGasSensor(result.data[0].gasSensor)
        setData(result.data);
        setTimeout(function(){
          fetchData()
          setTemperature(result.data[0].temperature)
          setHumidity(result.data[0].humidity)
          setGasSensor(result.data[0].gasSensor)
          setData(result.data);
       }, 2000);
       
      };
   
      fetchData()
    }, []);
      // POST request using axios inside useEffect React hook
      const switchStatus = { id: 1 , light:status };
      const postData = async () => {
      axios.post('http://192.168.2.6:4200/switch', switchStatus)
          .then(response => setId(response.data.id));
      }
                                                                                                        
//Theme
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#2196f3',
        dark: '#bbdefb',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#90caf9',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    typography: {
      useNextVariants: true,
    },
  })

  return (
    <div className="log" >
        <div style={{ 
      backgroundImage: `url('${logo}')`,
      backgroundRepeat:'no-repeat',
    }}>
      <div class="container">

</div>
      <PrimarySearchAppBar>  </PrimarySearchAppBar>
    <MuiThemeProvider theme={theme}>
     <CheckNull></CheckNull>
    <div className="chart" style={{ padding: 10, }}>
    <Analytics
      left={
        <AnalyticsBox
          title='Temperature Now'
         data={temperature}
        />
      }
      middle={
        <AnalyticsBox
          title='Humidity Now'
          data={humidity}
        />
      }
      right={
        <AnalyticsBox
          title='CO2 Now'
      data={gasSensor}
        />
      }
    /> 

   
  </div>
  <Container
      className="col-6 .col-md-4"
      style={{ minHeight: "100vh" }}
    >        
<Card>

  <Card.Body>
    <h2 className="text-center mb-4">Fan Control</h2>
    <div style={{justifyContent:'center'}}>
    <div class="row justify-content-center">
        <div className="col-lg-3"> 
    <img style={{maxWidth:120}}  src={fan}/>
    </div>
    </div>
    <Switch
    checked={state.checkedA}
    onChange={handleChange}
    size="medium" 
    name="checkedA"
    inputProps={{ 'aria-label': 'secondary checkbox' }}
    title="Fan"
  />
    </div>

  </Card.Body>
</Card>
<Card>

  <Card.Body>
    <h2 className="text-center mb-4">Air status</h2>  
 
    <Headline></Headline>
  </Card.Body>

</Card>

</Container>

  </MuiThemeProvider>
  </div>
  </div>
  )
}
