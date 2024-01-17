import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import pb from "@/util/pocketbase";
import { SxProps, Theme, capitalize } from "@mui/material";
import { ListResult, RecordModel } from "pocketbase";

export interface ITextSearchField {
  field: string;
  label: string;
  sx?: SxProps<Theme>;
  onChange: (val: string | null) => void;
  // queryFn?: <ListResult<RecordModel>>;
}
export default function TextSearchField({
  field,
  label,
  onChange,
}: ITextSearchField) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly string[]>([]);
  const [text, setText] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    if (!text) return undefined;

    setLoading(true);

    const debounce = setTimeout(async () => {
      try {
        const fullList = await pb
          .collection(`distinct_${field}`)
          .getList(1, 100, {
            filter: `${field}>="${text}"`,
            fields: `${field}`,
          });

        if (active) {
          setOptions(fullList.items.map((itm) => itm[field]));
          setLoading(false);
        }
      } catch (error) {
        if ((error as string).includes("autocancel")) {
          return;
        }
        console.error(error);
      }
    }, 250);

    return () => {
      clearTimeout(debounce);
      active = false;
    };
  }, [field, text]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      openText={text}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setLoading(false);
        setOpen(false);
      }}
      onChange={(e, val) => {
        setText("");
        onChange(val);
      }}
      onInputChange={(e, val) => setText(capitalize(val))}
      isOptionEqualToValue={(option, val) => option === val}
      getOptionLabel={(option) => capitalize(option)}
      options={options}
      loading={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || capitalize(field)}
          InputProps={{
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
