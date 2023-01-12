import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import useMapStore from '@src/stores/MapStore';
import { icons } from './Icons';

export interface StopPointResult {
  type: string;
  centrePoint: number[];
  stopPoints: StopPoint[];
  pageSize: number;
  total: number;
  page: number;
}

export interface StopPoint {
  type: string;
  naptanId: string;
  modes: string[];
  icsCode: string;
  stopType: string;
  stationNaptan: string;
  lines: Record<string, unknown>[];
  lineGroup: Record<string, unknown>[];
  lineModeGroups: Record<string, unknown>[];
  status: boolean;
  id: string;
  commonName: string;
  distance: number;
  placeType: string;
  additionalProperties: Record<string, unknown>;
  childrean: Record<string, unknown>;
  lat: number;
  lon: number;
}

const containerStyle = {
  width: '100%',
  height: '500px',
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB8ul_todxwTYAYIfs5fzUXSLVQHlfAUA0',
  });

  const [center, setCenter] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  const {
    selectedPlace,
    stopPointList,
    setStopPointList,
    setSelectedStopPoint,
  } = useMapStore();

  useEffect(() => {
    async function getStopPoints() {
      setStopPointList([]);
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint?lat=${selectedPlace.lat}&lon=${selectedPlace.lon}&stopTypes=NaptanMetroStation&radius=1000`,
      );
      const data = await res.json();
      if (data.stopPoints.length) {
        setStopPointList(data.stopPoints);
      }
    }

    if (selectedPlace !== null) {
      getStopPoints();

      setCenter({
        lat: selectedPlace.lat,
        lng: selectedPlace.lon,
      });
    }
  }, [selectedPlace]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={selectedPlace ? 15 : 11}
    >
      <>
        {selectedPlace && (
          <Marker
            label={selectedPlace.commonName}
            position={{
              lat: selectedPlace.lat,
              lng: selectedPlace.lon,
            }}
          />
        )}
        {stopPointList && stopPointList.length ? (
          <>
            {stopPointList.map((stopPoint) => (
              <Marker
                icon={icons.stopPoint}
                animation={google.maps.Animation.DROP}
                key={stopPoint.id}
                position={{
                  lat: stopPoint.lat,
                  lng: stopPoint.lon,
                }}
                onClick={() => setSelectedStopPoint(stopPoint)}
              />
            ))}
          </>
        ) : null}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
