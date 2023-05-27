import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";




const ReastauUpdate = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  //const [users, setUsers] = useState([]);
  const [adresse, setAdresses] = useState([]);
  const [series, setSeries] = useState([]);
  const [rank, setRanks] = useState("1");
  const [nom, setNom] = useState([]);
  const [jour_open, setJourOpen] = useState(["Lundi"]);
  const [jour_close, setJourClose] = useState(["Lundi"]);
  const concatenatedString = "De "+ jour_open.concat(" A "+jour_close );
  const [selectedVilleId, setSelectedVilleNom] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedSerieId, setSelectedSerieId] = useState("");
  const [timeOpen, setTimeOpen] = useState("2023-05-04T11:20:00.000Z");
  const [timeClose, setTimeClose] = useState("2023-05-04T11:20:00.000Z");
  const {id}=useParams()

    useEffect(()=>{
        loadResto()
    },[]);
    
    const loadResto=async ()=>{
      
      const result= await axios.get(`/api/restaus/restau/id/${id}`)
      setRestaurant(result.data)
      console.log(result.data)

    };



  const handleRankChange = (event) => {
    setRanks(event.target.value);
  }; 
  const handleZoneChange = (event) => {
    setSelectedZoneId(event.target.value);
  }; 
  const handleSerieChange = (event) => {
    setSelectedSerieId(event.target.value);
  }; 

  const handleJourOpenChange = (event) => {
    setJourOpen(event.target.value);
  };
  const handleJourCloseChange = (event) => {
    setJourClose(event.target.value);
  };
  

  const handleTimeOpen = (event) => {
    setTimeOpen(event.target.value);
  };
  const handleTimeClose = (event) => {
    setTimeClose(event.target.value);
  };

  useEffect(() => {
    axios.get("/api/villes/").then((response) => {
      setVilles(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/series/all").then((response) => {
      setSeries(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/user/all").then((response) => {
      setSeries(response.data);
    });
  }, []);

  const handleVilleChange = (event) => {
    const villeNom = event.target.value;
    setSelectedVilleNom(villeNom);
    axios.get(`/api/zones/ville/zones/${villeNom}`).then((response) => {
      setZones(response.data);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/restaus/save", {
      nom : nom,
      adress:adresse,
      rank:rank,
      hopen: timeOpen,
      hclose:timeClose,
      lang:longitude,
      lat:latitude,
      jourOuverture:concatenatedString ,
      serie: {
        id: selectedSerieId
      },
      zone: {
        id: selectedZoneId
      }
        
    }).then((response) => {
        setNom("");
        setAdresses("");
        setRanks("");
        setLongitude("");
        setLatitude("");
        setTimeOpen("");
        setTimeClose("");
        setSelectedZoneId("");
        selectedSerieId("");
        setSelectedVilleNom("");
    });
};

  return (
    <div>

      <h2>Creation d'une Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Nom du restaurant" className="form-control" id="nom" value={restaurant.nom} onChange={(event) => setNom(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
          <input type="text" placeholder="Adresse"  className="form-control" id="adresse" value={restaurant.adress} onChange={(event) => setAdresses(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Longitude" id="longitude" value={restaurant.lang} onChange={(event) => setLongitude(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Latitude" id="latitude" value={restaurant.lat} onChange={(event) => setLatitude(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
        <label htmlFor="villeId">Select a Heure Open:</label>
          <input type="time" className="form-control"  placeholder="Latitude" id="heur_close" value={restaurant.hopen} onChange={handleTimeOpen}/>
        </div>
        <br/>
        <div className="form-group">
        <label htmlFor="villeId">Select a Heure Close:</label>
          <input type="time" className="form-control" id="heur_close" value={restaurant.hclose} onChange={handleTimeClose}/>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="Rank">Select a Rank:</label>
          <select className="form-control" id="rankId" value={restaurant.rank} onChange={handleRankChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <br/> 
        <div className="form-group">
          <label htmlFor="jrouverture">Jours d'ouverture:</label>
          <br/>
          Du: <select nom="jour_open" id="jour_open" value={jour_open} onChange={handleJourOpenChange}>
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
                <option value="Samedi">Samedi</option>
                <option value="Dimanche">Dimanche</option>
            </select>
          A : <select nom="jour_close" id="jour_close" value={jour_close} onChange={handleJourCloseChange}>
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
                <option value="Samedi">Samedi</option>
                <option value="Dimanche">Dimanche</option>
            </select>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="villeId">Select a city:</label>
          <select className="form-control" id="villeId" value={selectedVilleId} onChange={handleVilleChange}>
          <option selected="selected"> {restaurant.zone && restaurant.zone.ville && restaurant.zone.ville.nom}</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.nom}>
                {ville.nom}
              </option>
            ))}
          </select>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="zoneId">Select a zone:</label>
          <select className="form-control" id="zoneId" value={selectedZoneId} onChange={handleZoneChange} >
             <option selected="selected"> {restaurant.zone && restaurant.zone.nom}</option>
             
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serieId">Select a serie:</label>
          <select className="form-control" id="serieId" value={restaurant.serie} onChange={handleSerieChange} >
            <option value="">All series</option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.nom}
              </option>
            ))}
          </select>
        </div>
        <br/>
            <button type="submit" className="btn btn-primary">Add Restaurant</button>      
      </form>
    </div>
    
  );
};

export default ReastauUpdate;
