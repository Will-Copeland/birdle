import { GeoResult, geocode, parse } from "@/util/geocoder";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as React from "react";
import { GeoResultItem } from "../GeoResultItem";
import TextSearchField from "./DistinctAutoComplete";

import { SearchState, XenoCantoRecording } from "@/util/models/Pocketbase";
import usePrevious from "@/hooks/usePrevious";
import { searchWithState } from "@/util/pocketbase/actions/recordings";
export interface ISearchProps {
  onResults: (results: XenoCantoRecording[]) => void;
}

export function Search({ onResults }: ISearchProps) {
  const [state, setState] = React.useState<SearchState>({});
  const previousState = usePrevious(state);
  const [possibleSpecies, setPossibleSpecies] = React.useState<string[]>([]);
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState();
  const [geoResults, setGeoResults] = React.useState<any>([]);

  React.useEffect(() => {
    (async () => {
      if (state != previousState && !!previousState) {
        const list = await searchWithState(state);
        const _results = list
          ?.map((li) => li.items)
          .flat() as unknown as XenoCantoRecording[];

        onResults(_results);
      }
    })();
  }, [state, onResults, previousState]);

  function handleSearchStateUpdate(state: SearchState) {
    setState(state);
  }

  return (
    <div>
      <Typography>Choose a primary filter</Typography>
      <Box>
        <TextSearchField
          onChange={(val) =>
            handleSearchStateUpdate({
              ...state,
              gen: val,
            })
          }
          label="Genus"
          field="gen"
        />
        <TextField
          label="Location"
          value={text}
          onChange={({ target: { value } }) =>
            handleSearchStateUpdate({
              ...state,
              loc: value,
            })
          }
        />
      </Box>
      <div>
        <TextSearchField
          onChange={(val) => {
            handleSearchStateUpdate({
              ...state,
              sp: val,
            });
          }}
          label="Species"
          field="sp"
          options={possibleSpecies || undefined}
        />
      </div>
    </div>
  );
}
