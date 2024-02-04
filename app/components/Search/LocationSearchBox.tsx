import { TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

export interface ILocationSearchBoxProps {}

export function LocationSearchBox(props: ILocationSearchBoxProps) {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <TextField onChange={(val) => setText(val.currentTarget.value)} />
    </div>
  );
}
