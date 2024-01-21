"use client";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  MarkerProps,
  LayerGroup,
} from "react-leaflet";
import * as React from "react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { LatLngTuple } from "leaflet";
import TextSearchField from "../components/Search/DistinctAutoComplete";
import { RecordModel } from "pocketbase";
import { Search } from "../components/Search/Search";
import { XenoCantoRecording } from "@/util/models/Pocketbase";

export interface IMapPageProps {}
const Map = dynamic(
  async () =>
    await import("./components/CustomMap").then((module) => module.CustomMap),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
);
export default function MapPage({}: IMapPageProps) {
  const center = [37, -122] as LatLngTuple;
  const [settings, setSettings] = useState<{ mode: "heatmap" | "marker" }>({
    mode: "heatmap",
  });
  const [species, setSpecies] = useState<string | null>("");
  const [recordings, setRecordings] = useState<XenoCantoRecording[]>([]);

  const markers = useMemo(() => {
    if (!recordings || settings.mode === "heatmap") return [];

    return recordings.map((record, i) => {
      const { id, lat, lng, gen, sp, loc } = record;
      return (
        <Marker key={id} position={[Number(lat), Number(lng)]}>
          <Popup>
            <h6>{gen}</h6>
            <h6>{sp}</h6>
            <p>{loc}</p>
          </Popup>
        </Marker>
      );
    });
  }, [recordings, settings]);

  return (
    <Box>
      <TextSearchField
        onChange={(species) => {
          setSpecies(species);
        }}
        label="General"
        field="gen"
      />
      <Search onResults={(results) => setRecordings(results)} />
      <Map
        style={{ width: "100vw", height: "100vh" }}
        center={center}
        zoom={5}
        points={recordings}
        markers={markers}
      />
    </Box>
  );
}
