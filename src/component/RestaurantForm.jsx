import React, { useState, useEffect } from "react";
import axios from "axios";




const ReastauForm = () => {
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  //const [users, setUsers] = useState([]);
  const [image, setImages] = useState("");

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



  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages(e.target.result);
    };
    reader.readAsDataURL(file);
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

  const handleJourChange = (event) => {
    if(event.target.nom===jour_open){
      setJourOpen(event.target.value);
    }else setJourClose(event.target.value)
    
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
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/villes/").then((response) => {
      setVilles(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/series/all").then((response) => {
      setSeries(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/user/all").then((response) => {
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
    axios.post("https://local-restau-springboot-backend-production.up.railway.app/api/restaus/save", {
      nom : nom,
      adress:adresse,
      rank:rank,
      hopen: timeOpen,
      hclose:timeClose,
      lang:longitude,
      lat:latitude,
      image:image,
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
          <input type="text" placeholder="Nom du restaurant" className="form-control" id="nom" value={nom} onChange={(event) => setNom(event.target.value)}/>
        </div>
        <br/>
        <div className="col-md-6">
                <label htmlFor="restaurant-adresse" className="form-label">Photo:</label>
                <input className="form-control" type="file" accept="image/*" onChange={handlePhotoChange} />
              </div>
              <br/>
        <div className="form-group">
          <input type="text" placeholder="Adresse"  className="form-control" id="adresse" value={adresse} onChange={(event) => setAdresses(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Longitude" id="longitude" value={longitude} onChange={(event) => setLongitude(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Latitude" id="latitude" value={latitude} onChange={(event) => setLatitude(event.target.value)}/>
        </div>
        <br/>
        <div className="form-group">
        <label htmlFor="villeId">Select a Heure Open:</label>
          <input type="time" className="form-control"  placeholder="Latitude" id="heur_close" value={timeOpen} onChange={handleTimeOpen}/>
        </div>
        <br/>
        <div className="form-group">
        <label htmlFor="villeId">Select a Heure Close:</label>
          <input type="time" className="form-control" id="heur_close" value={timeClose} onChange={handleTimeClose}/>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="Rank">Select a Rank:</label>
          <select className="form-control" id="rankId" value={rank} onChange={handleRankChange}>
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
            <option value="">All villes</option>
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
            <option value="">All zones</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serieId">Select a serie:</label>
          <select className="form-control" id="serieId" value={selectedSerieId} onChange={handleSerieChange} >
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

export default ReastauForm;
