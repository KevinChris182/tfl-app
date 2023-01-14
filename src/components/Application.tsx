import React, { useEffect, useState } from 'react';
import './Application.scss';
import { Row, Col, Form } from 'react-bootstrap';
import Map from './Map';
import SearchResult from './SearchResult';
import useDebounce from '@src/hooks/useDebounce';
import Navbar from './Navbar';
import StopPointDetail from './StopPointDetail';
import Footer from './Footer';
import useMapStore from '@src/stores/MapStore';

const Application: React.FC = () => {
  const placeTypes: string[] = [
    'AreaForIntensification',
    'BikePoint',
    'Boroughs',
    'Cabwise',
    'CarPark',
    'CensusOutputAreas',
    'CensusSuperOutputAreas',
    'CentralActivityZone',
    'ChargeConnector',
    'ChargeStation',
    'CoachBay',
    'CoachPark',
    'CyclePark',
    'JamCam',
    'OnStreetMeteredBay',
    'OpportunityAreas',
    'OtherCoachParking',
    'OysterTicketShop',
    'RedLightAndSpeedCam',
    'RedLightCam',
    'SpeedCam',
    'TaxiRank',
    'VariableMessageSign',
    'Wards',
    'WaterfreightBridge',
    'WaterfreightDock',
    'WaterfreightJetty',
    'WaterfreightLock',
    'WaterfreightOther Access Point',
    'WaterfreightTunnel',
    'WaterfreightWharf',
  ];

  const [from, setFrom] = useState('');
  const [fromResult, setFromResult] = useState([]);
  const [placeType, setPlaceType] = useState('');
  const [showSearchResult, setShowResult] = useState(false);

  const debouncedFrom = useDebounce(from, 400);

  const { selectedPlace } = useMapStore();

  useEffect(() => {
    async function fetchPlaces() {
      if (from !== '') {
        setShowResult(true);
        const res = await fetch(
          `https://api.tfl.gov.uk/Place/Search?name=${debouncedFrom}${
            placeType !== '' ? `&type=${placeType}` : ''
          }`,
        );
        const data = await res.json();
        if (data.length) {
          setFromResult(data.slice(0, 10));
        }
      }
    }

    fetchPlaces();
  }, [debouncedFrom]);

  useEffect(() => {
    if (selectedPlace) {
      setFrom(selectedPlace.commonName);
    }
  }, [selectedPlace]);

  function handleBodyClicked() {
    if (showSearchResult) {
      setShowResult(false);
    }
  }

  return (
    <div onClick={() => handleBodyClicked()}>
      <React.Fragment>
        <Navbar />
        <Row className='g-0 mx-0'>
          <Col className='position-relative'>
            <Map></Map>
            <Row className='search-row g-0 mx-0'>
              <Col xs={12} md={{ span: 8, offset: 2 }}>
                <Row className='searchbar-wrapper mx-0'>
                  <Col xs={12} md={4}>
                    <Form.Select
                      size='lg'
                      aria-label='Select place type'
                      onChange={(e) => setPlaceType(e.target.value)}
                    >
                      <option>Select place type</option>
                      {placeTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={8}>
                    <Form className='position-relative'>
                      <Form.Group controlId='from'>
                        <Form.Control
                          size='lg'
                          type='text'
                          placeholder='Search place'
                          onChange={(e) => setFrom(e.target.value)}
                          value={from}
                        />
                        {showSearchResult && (
                          <SearchResult
                            results={fromResult}
                            onSearchItemClicked={() => setFrom('')}
                          />
                        )}
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <StopPointDetail />
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default Application;
