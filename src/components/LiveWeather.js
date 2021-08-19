
import axios from "axios";
import React, { useState } from "react"
import { Container, Card } from "react-bootstrap";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import logo from "../assets/lake.jpg"
//Read External Api
export default function LiveWeather() {
const [location, setLocation] = useState();

const [data, setData] = useState();
const [image, setImage] = useState('https://i.ibb.co/9bHqhGh/icons8-nothing-found-64.png');
const [humidty, setHumidity] = useState();
const [temperature, setTemperature] = useState();
const [wind_speed, setWind_speed] = useState();
const [weather_description, setWeather_description] = useState();

 if (typeof data === "undefined" ) {
  setData('City is not found')
 }
        const fetchData = async () => {
          const result = await axios(
            `http://api.weatherapi.com/v1/current.json?key=a576595d92f54b7089f190459210703&q=${location}`,
          );
   
          console.log(result.data)
          if ( typeof result.data.location.name === 'undefined'){
            console.log("City is not found")
            setData('City is not found')
            setImage('')
            setHumidity('')
            setTemperature('')
            setWind_speed('')
            setWeather_description('')
          } else{
              setData(result.data.location.name)
              setImage(result.data.current.condition.icon)
              setHumidity(result.data.current.humidity)
              setTemperature(result.data.current.temp_c)
              setWind_speed(result.data.current.wind_kph)
              setWeather_description(result.data.current.condition.text)
          }
          
        };

    
      const handleChange = (event) => {
setLocation(event)
fetchData()
          };
      
 
  return (
     <div>
               <div style={{ 
      backgroundImage: `url('${logo}')`,
      backgroundRepeat:'no-repeat',
    }}>
       <PrimarySearchAppBar></PrimarySearchAppBar>
       <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
<div class="container" >
<div class=" row justify-content-md-center">
<Card>
  <Card.Body>
    <h2 className="text-center mb-4">Check the live weather</h2>
    <h6 className="text-center mb-4">(Fill in city name)</h6>
    <div class="input-group input-group-lg">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-lg">City</span>
  </div>
  <input onChange={e => handleChange(e.target.value)} value={location} type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
    </input>
</div>
  </Card.Body>
</Card>
<Card>
  <Card.Body>
    <div style={{justifyContent:'center', alignItems:'flex-end'}}>
  <img src={image} alt="Logo" />
     </div>
    <h1 className="text-center mb-4">{data}</h1>
    <h2 className="text-center mb-4">{weather_description}</h2>
    <h2 className="text-center mb-4">Temperature: {temperature}</h2>
    <h2 className="text-center mb-4">Humidity: {humidty}</h2>
    <h2 className="text-center mb-4">Wind speed: {wind_speed}</h2>
    <div class="input-group input-group-lg">
  <div class="input-group-prepend">
  </div>
</div>
  </Card.Body>
</Card>

</div>
</div>
</Container>

</div>
      </div>

  )
}
