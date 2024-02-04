"use client";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

import { XenoCantoRecording } from "@/util/models/Pocketbase";
import dynamic from "next/dynamic";

export interface IMapPageProps {}
export default dynamic(
  async () => await import("./CustomMap").then((module) => module.CustomMap),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
);

export interface IMapProps extends MapContainerProps {
  markers?: any[];
  points: XenoCantoRecording[];
}
export function Map({
  center = [37, -122],
  zoom = 3,
  style,
  points,
}: IMapProps) {
  // @ts-ignore
  const [map, setMap] = useState<Map | null>(null);
  const [heatLayer, setHeatLayer] = useState();

  useEffect(() => {
    if (heatLayer) map?.removeLayer(heatLayer);
    const _points = points
      ? points.map((p) => {
          return [p.lat, p.lng];
        })
      : [];

    if (map)
      setHeatLayer(
        // @ts-ignore
        L.heatLayer(_points, { radius: 25, max: 10, minOpacity: 0.3 }).addTo(
          map
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const displayMap = React.useMemo(
    () => (
      <MapContainer
        style={style}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [center, style, zoom]
  );
  return <div>{displayMap}</div>;
}
