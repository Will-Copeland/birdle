"use client";
import { GeoResult, geocode, parse } from "@/util/geocoder";
import pb from "@/util/pocketbase";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import { GeoResultItem } from "./GeoResultItem";
import TextSearchField from "./TextSearchField";
export interface ISearchProps {
  onResults: () => GeoResult[];
}

export function Search(props: ISearchProps) {
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState();
  const [geoResults, setGeoResults] = React.useState<any>([]);

  return (
    <div>
      <div>
        <TextSearchField
          onChange={(val) => {
            console.log("Val: ", val);
          }}
          label="General Species"
          field="gen"
        />
        <TextSearchField
          onChange={(val) => {
            console.log("Val: ", val);
          }}
          label="Species"
          field="sp"
        />
      </div>
      <TextField
        label="Find a location"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />

      <Button
        onClick={async () => {
          setGeoResults(await getSuggestion("gen", text));
        }}
      >
        Go
      </Button>
      {geoResults.map((r) => (
        <GeoResultItem onClick={() => searchPb(parse(r))} key={r.id} geo={r} />
      ))}
    </div>
  );

  async function go() {
    const g = await geocode(text);

    setGeoResults(g);
  }

  async function getSuggestion(field: string, term: string) {
    try {
      const list = await pb.collection(`distinct_${field}`).getList(1, 100, {
        filter: `${field}>="${term}"`,
      });

      console.log(list);

      return list.items;
    } catch (error) {
      console.log(error);
      return [];
    }
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

      // setError(error.message);
    }
  }
}
