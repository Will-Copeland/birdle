"use client";
import { GeoResult, geocode, parse } from "@/util/geocoder";
import pb from "@/util/pocketbase";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import { GeoResultItem } from "./GeoResultItem";
export interface ISearchProps {}

export function Search(props: ISearchProps) {
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState();
  const [geoResults, setGeoResults] = React.useState<GeoResult[]>([]);

  return (
    <div>
      <TextField
        label="Find a location"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />

      <Button onClick={() => searchPb(text)}>Go</Button>
      {geoResults.map((r) => (
        <GeoResultItem onClick={() => searchPb(parse(r))} key={r.id} geo={r} />
      ))}
    </div>
  );

  async function go() {
    const g = await geocode(text);

    setGeoResults(g);
  }

  async function searchPb(loc: string) {
    console.log("LOC: ", loc);

    try {
      const list = await pb.collection("recordings").getList(1, 100, {
        filter: `loc~"${loc}" && q="A"`,
      });
      console.log(list);
    } catch (error) {
      console.log(error);

      setError(error.message);
    }
  }
}
