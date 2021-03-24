import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl,MenuItem,Select, Card, CardContent } from '@material-ui/core';
import Infobox from './Infobox';
import Table from './Table';
import { sortData } from './util';
import Linegraph from './Linegraph';
import Map from './Map';
import 'leaflet/dist/leaflet.css'; 

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData ] = useState([]);
    const [mapCenter, setMapCenter ] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);

    useEffect(()=> { 
        fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => { 
          setCountryInfo(data); 
        });
    }, []);

    useEffect(() => {
      const getCountriesDate = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
            const countries = data.map((country) => ({
                  name: country.country,
                  value: country.countryInfo.iso2
            }));
            const sortedData = sortData(data);
              setTableData(sortedData);
             setCountries(countries);
            });
      };
       getCountriesDate(); 
    }, []) 

    const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      

      const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
      
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter(data.countryInfo.lat, data.countryInfo.lng);
        setMapZoom(4);
      })
    };

    console.log("this is country code", countryInfo); 

  return (
    <div className="app">
      <div className="app_left">
      < div className="app_header">
            <h1>COVID-19 TRACKER</h1>
                <FormControl className="app_dropdown">
                     <Select variant="outlined" onChange={onCountryChange} value={country}>
                        <MenuItem value="worldwide">worldwide</MenuItem>
                          {countries.map((country) => ( 
                        <MenuItem value={country.value}>{country.name}</MenuItem>))}
                    </Select>
                </FormControl> 
           </div>
            <div className="app_stats">
                    <Infobox title="Coronavirus Case" cases={countryInfo.todayCases} total={countryInfo.cases} />
                    <Infobox title="Recoverd"  cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                    <Infobox title="Deaths"  cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
            </div>   
            <Map center={mapCenter}
            zoom={mapZoom} />
        </div>
       
        <Card className="app_right">
          <CardContent>
            <h1>Live cases by country</h1>
            <Table  countries={tableData}/>
            <h1>worldwide New cases</h1> 
            <Linegraph />              
          </CardContent>
        </Card>
    </div>
  ); 
}

export default App;
