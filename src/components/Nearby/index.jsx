import { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { getDataWithoutHeader } from "../../services/axios.service";
import markerImg from "/marker.png";

const Nearby = () => {
  const MAP_API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
  });
  // const lon = 32;
  // const lat = 32;

  const [currentLocation, setCurrentLocation] = useState();
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
  };

  const markerOptions = {
    icon: markerImg,
  };
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hostels, sethostels] = useState([]);
  const getHostels = async () => {
    const response = await getDataWithoutHeader("hostels");
    sethostels(response.hostels);
    // setCurrentLocation({lat:Number(hostels[0].latitude) , lng:Number(hostels[0].longitude)})
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setCurrentLocation({
        lat: Number(location.coords.latitude),
        lng: Number(location.coords.longitude),
      });
    });
    console.log(hostels);
    getHostels();
  }, []);

  return (
    <div className="mb-8">
      {selectedMarker && selectedMarker.name}

      {isLoaded ? (
        <div>
          <h1 className="text-center text-3xl font-semibold mb-4">
            Nearby Hostels
          </h1>
          <GoogleMap
            key={12}
            zoom={20}
            center={currentLocation}
            options={options}
            mapContainerClassName="w-full h-[30rem] rounded-lg"
          >
            <MarkerF key={12} position={currentLocation} />
            {hostels &&
              hostels.map((marker) => {
                return (
                  <div key={marker._id}>
                    <MarkerF
                      key={marker._id}
                      position={{
                        lat: Number(marker.latitude),
                        lng: Number(marker.longitude),
                      }}
                      clickable
                      onClick={() => setSelectedMarker(marker)}
                      options={markerOptions}
                    />
                  </div>
                );
              })}

            {selectedMarker && (
              <InfoWindowF
                position={{
                  lat: Number(selectedMarker.latitude),
                  lng: Number(selectedMarker.longitude),
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <h1 className="font-semibold ">{selectedMarker.name}</h1>
                <h1 className="font-semibold ">{selectedMarker.name}</h1>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>
      ) : (
        <div>LOADINGGGG...........</div>
      )}
    </div>
  );
};
export default Nearby;
