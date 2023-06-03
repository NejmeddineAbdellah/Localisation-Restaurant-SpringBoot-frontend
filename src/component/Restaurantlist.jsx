import axios from "axios";
import * as React from 'react';
import { useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Link, useParams } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input } from "antd";


const RestaurantList = () => {
  const [Restaurants, setRestaurants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [nom, setNom] = useState([]);
  const [image, setImages] = useState("");
  const [adresse, setAdresses] = useState([]);
  const [series, setSeries] = useState([]);
  const [rank, setRanks] = useState("1");
  const [jour_open, setJourOpen] = useState(["Lundi"]);
  const [jour_close, setJourClose] = useState(["Lundi"]);
  const concatenatedString = "De " + jour_open.concat(" A " + jour_close);
  const [selectedVilleId, setSelectedVilleNom] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedSerieId, setSelectedSerieId] = useState("");
  const [timeOpen, setTimeOpen] = useState("2023-05-04T11:20:00.000Z");
  const [timeClose, setTimeClose] = useState("2023-05-04T11:20:00.000Z");
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [editRestaurantId, setEditRestaurantId] = useState(null);
  //const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get("/api/restaus/").then((response) => {
      setRestaurants(response.data);
    });
  }, []);

  const showModal = () => {
    setModalVisible(true);
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

  const handleModalSubmit = () => {
    form.validateFields().then((values) => {
      values.zoneId = selectedZoneId;
      values.serieId = selectedSerieId;

      handleSubmit();
    });
  };
  const handleJourOpenChange = (event) => {
    setJourOpen(event.target.value);
  };

  const handleJourCloseChange = (event) => {
    setJourClose(event.target.value);
  };


  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTimeOpen = (event) => {
    setTimeOpen(event.target.value);
  };
  const handleTimeClose = (event) => {
    setTimeClose(event.target.value);
  };



  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };


  const handleVilleChange = (event) => {
    const villeNom = event.target.value;
    setSelectedVilleNom(villeNom);
    axios.get(`https://local-restau-springboot-backend-production.up.railway.app/api/zones/ville/zones/${villeNom}`).then((response) => {
      setZones(response.data);
    });
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      axios.delete(`https://local-restau-springboot-backend-production.up.railway.app/api/restaus/delete`, {
        data: { id: id }
      }).then(() => {
        setRestaurants(Restaurants.filter((restaurant) => restaurant.id !== id));
      });
    }
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



  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://local-restau-springboot-backend-production.up.railway.app/api/restaus/save", {
        nom: nom,
        adress: adresse,
        rank: rank,
        hopen: timeOpen,
        hclose: timeClose,
        lang: longitude,
        lat: latitude,
        image: image,
        jourOuverture: concatenatedString,
        serie: {
          id: selectedSerieId,
        },
        zone: {
          id: selectedZoneId,
        },
      })
      .then((response) => {
        const newRestaurant = response.data;
        setRestaurants([...Restaurants, newRestaurant]);
        setNom("");
        setAdresses("");
        setRanks("");
        setLongitude("");
        setLatitude("");
        setTimeOpen("");
        setTimeClose("");
        setSelectedZoneId("");
        setSelectedSerieId("");
        setSelectedVilleNom("");
      });
    handleModalCancel();
  };



  useEffect(() => {
    const loadImages = async () => {
      const updatedRestaurants = await Promise.all(
        Restaurants.map(async (restaurant) => {
          if (restaurant.image) {
            const imageUrl = await getImageURL(restaurant.image);
            return { ...restaurant, imageUrl };
          }
          return restaurant;
        })
      );
      setRestaurants(updatedRestaurants);
    };
  }, [Restaurants]);

  const getImageURL = async (blob) => {
    try {
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      console.error("Error creating image URL:", error);
      return "";
    }
  };

  return (
    <div>
      <h2>Restaurant List</h2>
      <button className="btn btn-success" onClick={showModal}>Add Restaurant</button>

      <Modal
        title="Add Restaurant"
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={handleModalCancel}
      >

        <form onSubmit={handleModalSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Nom du restaurant" className="form-control" id="nom" value={nom} onChange={(event) => setNom(event.target.value)} />
          </div>
          <br />
          <div className="col-md-6">
            <label htmlFor="restaurant-adresse" className="form-label">Photo:</label>
            <input className="form-control" type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <br />
          <div className="form-group">
            <input type="text" placeholder="Adresse" className="form-control" id="adresse" value={adresse} onChange={(event) => setAdresses(event.target.value)} />
          </div>
          <br />
          <div className="form-group">
            <input type="number" className="form-control" placeholder="Longitude" id="longitude" value={longitude} onChange={(event) => setLongitude(event.target.value)} />
          </div>
          <br />
          <div className="form-group">
            <input type="number" className="form-control" placeholder="Latitude" id="latitude" value={latitude} onChange={(event) => setLatitude(event.target.value)} />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="villeId">Select a Heure Open:</label>
            <input type="time" className="form-control" placeholder="Latitude" id="heur_close" value={timeOpen} onChange={handleTimeOpen} />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="villeId">Select a Heure Close:</label>
            <input type="time" className="form-control" id="heur_close" value={timeClose} onChange={handleTimeClose} />
          </div>
          <br />
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
          <br />
          <div className="form-group">
            <label htmlFor="jrouverture">Jours d'ouverture:</label>
            <br />
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
          <br />
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
          <br />
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
          <br />
        </form>
      </Modal>
      <table className="table table-bordered" style={{ fontSize: "20px" }}>
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>ID</th>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Image</th>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Nom</th>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Adresse</th>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>serie</th>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>zone</th>
            <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {Restaurants.map((Restaurant) => (
            <tr key={Restaurant.id}>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>{Restaurant.id}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                <img src={Restaurant.image} alt="Restaurant" style={{ height: '150px', width: '150px', objectFit: 'cover' }} />
              </td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>{Restaurant.nom}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>{Restaurant.adress}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>{Restaurant.serie && Restaurant.serie.nom}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>{Restaurant.zone && Restaurant.zone.nom}</td>
              <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                <Link className="btn btn-info ml-2" to={`/map/${Restaurant.id}`}>
                  <LocationOnIcon /> Localiser
                </Link>
                <b>   </b>
                <Link className="btn btn-warning ml-2" to={`/editresto/${Restaurant.id}`}>
                  <EditOutlined /> Modifier
                </Link>
                <b>   </b>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(Restaurant.id)}>
                  <DeleteOutlined /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default RestaurantList;
