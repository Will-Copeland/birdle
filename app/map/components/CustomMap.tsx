"use client ";
import type {
  Layer,
  LayerGroup,
  FitBoundsOptions,
  LatLngBoundsExpression,
  MapOptions,
} from "leaflet";
import { Control, Map as LeafletMap, map, marker, tileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { HTMLProps } from "react";
import { useCallback, useEffect, useState } from "react";

import L from "leaflet";
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export type ControlledLayer = {
  addLayer(layer: Layer): void;
  removeLayer(layer: Layer): void;
};

export type LeafletContextInterface = Readonly<{
  __version: number;
  map: LeafletMap;
  layerContainer?: ControlledLayer | LayerGroup;
  layersControl?: Control.Layers;
  overlayContainer?: Layer;
  pane?: string;
}>;

const CONTEXT_VERSION = 1;

function createLeafletContext(map: LeafletMap): LeafletContextInterface {
  return Object.freeze({ __version: CONTEXT_VERSION, map });
}

type DivProps = HTMLProps<HTMLDivElement>;

export interface MapContainerProps extends MapOptions, DivProps {
  bounds?: LatLngBoundsExpression;
  boundsOptions?: FitBoundsOptions;
  whenReady?: () => void;
}

export function Map({
  center = [0, 0],
  zoom = 1,
  bounds,
  boundsOptions = { padding: [500, 500], maxZoom: 21 },
  whenReady,
  ...options
}: MapContainerProps) {
  const [context, setContext] = useState<LeafletContextInterface | null>(null);

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new LeafletMap(node, { zoomControl: false, ...options });

      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      marker(center).addTo(map);

      if (center != null && zoom != null) {
        map.setView(center, zoom);
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions);
      }
      if (whenReady != null) {
        map.whenReady(whenReady);
      }

      setContext(createLeafletContext(map));
    }
  }, []);

  useEffect(() => {
    return () => {
      context?.map.remove();
    };
  }, []);

  return <div style={options.style} ref={mapRef} />;
}
