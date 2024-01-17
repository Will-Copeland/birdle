import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  MarkerProps,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import * as React from "react";

export interface IMapProps extends MapContainerProps {
  markers: any[];
}

export function Map({
  center = [122, 37],
  zoom = 3,
  style,
  markers,
}: IMapProps) {
  return (
    <MapContainer
      style={style}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}
