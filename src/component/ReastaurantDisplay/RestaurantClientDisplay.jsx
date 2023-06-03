import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Avatar, Select } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Option } = Select;

const RestauDetails: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedSerieId, setSelectedSerieId] = useState("");
  const [zones, setZones] = useState([]);
  const [series, setSeries] = useState([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/villes/").then((response) => {
      setCities(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/series/all").then((response) => {
      setSeries(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/restaus/").then((response) => {
      setRestaurants(response.data);
    });
  }, []);

  const handleCityChange = (value) => {
    setSelectedCityId(value);
    axios.get(`https://local-restau-springboot-backend-production.up.railway.app/api/zones/ville/zones/${value}`).then((response) => {
      setZones(response.data);
    });
  };

  const handleZoneChange = (value) => {
    setSelectedZoneId(value);
    axios.get(`https://local-restau-springboot-backend-production.up.railway.app/api/restaus/filter/${selectedCityId}/${value}`).then((response) => {
      setRestaurants(response.data);
    });
  };

  const handleSerieChange = (value) => {
    setSelectedSerieId(value);
    axios.get(`https://local-restau-springboot-backend-production.up.railway.app/api/restaus/filter2/${selectedCityId}/${selectedZoneId}/${value}`).then((response) => {
      setRestaurants(response.data);
    });
  };

  return (
    <div className='container' style={{ margin: '30px auto', width: '100%' }}>
      <div style={{ marginBottom: '16px'}}>
        <h3>Specifier Votre Restaurant</h3>
        Ville :{' '}
        <Select
          style={{ width: 120, marginRight: '10px' }}
          placeholder="Filter by Ville"
          value={selectedCityId}
          onChange={handleCityChange}
        >
          {cities.map((ville) => (
            <Option key={ville.id} value={ville.nom}> {/* Use the ID as the value */}
              {ville.nom}
            </Option>
          ))}
        </Select>
        Zone :{' '}

        <Select
          style={{ width: 120, marginRight: '10px' }}
          placeholder="Filter by Zone"
          value={selectedZoneId}
          onChange={handleZoneChange}
        >
          {zones.map((zone) => (
            <Option key={zone.id} value={zone.nom}>
              {zone.nom}
            </Option>
          ))}
        </Select>
        Serie :{' '}

        <Select
          style={{ width: 120, marginRight: '10px' }}
          placeholder="Filter by Serie"
          value={selectedSerieId}
          onChange={handleSerieChange}
        >
          {series.map((serie) => (
            <Option key={serie.id} value={serie.nom}>
              {serie.nom}
            </Option>
          ))}
        </Select>
      </div>

      <Card>
        <Row gutter={[16, 16]}>
          {restaurants.map((restaurant) => (
            <Col xs={24} sm={12} md={8} lg={6} key={restaurant.id}>
              <Card
                style={{ width: '100%' }}
                cover={
                  <img alt="example" src={restaurant.image} height={240} />
                }
                actions={[
                  <Link to={`/map/${restaurant.id}`} key="location">
                    <LocationOnIcon />
                  </Link>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<RestaurantMenuIcon />}
                  title={restaurant.nom}
                  description={restaurant.adress}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default RestauDetails;
