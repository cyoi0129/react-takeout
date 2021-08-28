import { FC } from "react";
import { shopItem } from "../model/Shop";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { mapKey } from "../config";

export type Props = {
  item: shopItem;
}

const containerStyle = {
  width: "300px",
  height: "300px",
};

const MapObject: FC<Props> = (Props) => {
  const { item } = Props;
  const center = {
    lat: item.lat,
    lng: item.lng,
  };

  return (
    <LoadScript googleMapsApiKey={mapKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      ><Marker position={center} /></GoogleMap>
    </LoadScript>
  );
};

export default MapObject;