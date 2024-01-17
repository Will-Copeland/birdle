"use client";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  MarkerProps,
} from "react-leaflet";
import * as React from "react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { LatLngTuple } from "leaflet";
import TextSearchField from "../components/TextSearchField";
import pb from "@/util/pocketbase";
import { RecordModel } from "pocketbase";

export interface IMapPageProps {}
const Map = dynamic(
  async () => await import("./components/Map").then((module) => module.Map),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
);
export default function MapPage({}: IMapPageProps) {
  const center = [37, -122] as LatLngTuple;
  const [species, setSpecies] = useState<string | null>("");
  const [recordings, setRecordings] = useState<RecordModel[]>([]);

  useEffect(() => {
    const getRecs = async () => {
      const recordings = await pb.collection("recordings").getList(1, 500, {
        filter: `gen="${species}"`,
      });

      console.log("Rec: ", recordings);

      setRecordings(recordings.items);
    };

    if (species) getRecs();
  }, [species]);

  const markers = useMemo(() => {
    if (!recordings) return [];
    return recordings.map(({ id, lat, lng }) => {
      return (
        <Marker key={id} position={[lat, lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    });
  }, [recordings]);

  console.log(markers);

  return (
    <Box>
      <TextSearchField
        onChange={(val) => {
          setSpecies(val);
        }}
        label="General"
        field="gen"
      />

      <Map
        style={{ width: "100vw", height: "100vh" }}
        center={center}
        zoom={5}
        markers={markers}
      />
    </Box>
  );
}
