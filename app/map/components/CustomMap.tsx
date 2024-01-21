import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import * as React from "react";
import L, { Layer, LayerGroup, Map } from "leaflet";
import "leaflet.heat";

import { XenoCantoRecording } from "@/util/models/Pocketbase";
import { Ref } from "react";

export interface IMapProps extends MapContainerProps {
  markers: any[];
  points: XenoCantoRecording[];
}

export function CustomMap({
  center = [122, 37],
  zoom = 3,
  style,
  markers,
  points,
}: IMapProps) {
  const [map, setMap] = React.useState<Map | null>(null);
  const [heatLayer, setHeatLayer] = React.useState();

  React.useEffect(() => {
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
        {/* {markers} */}
      </MapContainer>
    ),
    [center, style, zoom]
  );
  return <div>{displayMap}</div>;
}
