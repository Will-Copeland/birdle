import { Box, TextField, Typography } from "@mui/material";
import * as React from "react";
import TextSearchField from "./DistinctAutoComplete";
import _ from "lodash";
import { SearchState, XenoCantoRecording } from "@/util/models/Pocketbase";

export interface ISearchInputsProps {
  onInput: (newState: SearchState) => void;
  state: SearchState;
}
export function SearchInputs({
  onInput,
  state: incomingState,
}: ISearchInputsProps) {
  const [possibleSpecies, setPossibleSpecies] = React.useState<string[]>([]);

  function handleSearchStateUpdate(newState: SearchState) {
    onInput({ ...incomingState, ...newState } as SearchState);
  }

  return (
    <div>
      <Box>
        <TextSearchField
          onChange={(val) =>
            handleSearchStateUpdate({
              gen: val,
            })
          }
          label="Genus"
          field="gen"
        />
        <TextField
          label="Location"
          value={""}
          onChange={({ target: { value } }) =>
            handleSearchStateUpdate({
              loc: value,
            })
          }
        />
      </Box>
      <div>
        <TextSearchField
          onChange={(val) => {
            handleSearchStateUpdate({
              sp: val,
            });
          }}
          disabled={!incomingState.gen}
          label="Species"
          field="sp"
        />
      </div>
    </div>
  );
}
