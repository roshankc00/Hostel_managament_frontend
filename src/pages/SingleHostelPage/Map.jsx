import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const Map = ({ lat, lon }) => {
  const MAP_API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
  });

  return (
    <div className="">
      {isLoaded ? (
        <div>
          <MapLoaded lon={lon} lat={lat} />
        </div>
      ) : (
        <div>LOADINGGGG...........</div>
      )}
    </div>
  );
};

function MapLoaded({ lat, lon }) {
  const markers = { lat: Number(lat), lng: Number(lon) };
  console.log(lat, lon);
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  return (
    <GoogleMap
      zoom={20}
      center={markers}
      options={options}
      mapContainerClassName="w-full h-[40rem] rounded-md"
    >
      <MarkerF position={markers} />
    </GoogleMap>
  );
}

export default Map;
