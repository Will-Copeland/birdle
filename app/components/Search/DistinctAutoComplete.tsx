import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {
  SxProps,
  Theme,
  capitalize,
  Box,
  Typography,
  Divider,
  ListItem,
} from "@mui/material";
import pb from "@/util/pocketbase/initPocketbase";

export interface IDistinctAutoCompleteProps<T> {
  field: string;
  label: string;
  sx?: SxProps<Theme>;
  onChange: (val: string) => void;
  freeSolo?: boolean;
  queryFn?: any;
  options?: string[];
}
export default function DistinctAutoComplete<T>({
  field,
  label,
  onChange,
  freeSolo,
  options,
}: IDistinctAutoCompleteProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const [withCount, setWithCount] = React.useState<
    readonly { label: string; count: number }[]
  >([]);
  React.useEffect(() => {
    let active = true;
    if (!text) return undefined;

    setLoading(true);

    const debounce = setTimeout(async () => {
      try {
        const list = await pb.collection(`count_${field}`).getList(1, 100, {
          filter: `${field} >= "${text.toLowerCase().trim()}"`,
        });

        if (active) {
          setWithCount(
            list.items.map((itm) => ({
              label: capitalize(itm[field]),
              count: itm.COUNT,
            }))
          );
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        if ((error as string).includes("autocancel")) {
          return;
        }
      }
    }, 250);

    return () => {
      clearTimeout(debounce);
      active = false;
    };
  }, [field, text]);

  return (
    <Box>
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
          onChange(!!val && typeof val === "object" ? val.label : "");
        }}
        filterOptions={(opts, state) =>
          opts.filter((opt) =>
            (opt?.label?.toLowerCase() || opt).startsWith(
              state.inputValue.toLowerCase()
            )
          )
        }
        freeSolo={freeSolo}
        onInputChange={(e, val) => setText(val)}
        isOptionEqualToValue={(opt, val) => opt === val}
        getOptionLabel={options ? (opt) => capitalize(opt) : undefined}
        renderOption={options ? undefined : renderOptions}
        options={options || withCount}
        loading={false}
        renderInput={(params) => (
          <TextField
            {...params}
            label={capitalize(label || field)}
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
    </Box>
  );

  function renderOptions(props: React.HTMLAttributes<HTMLLIElement>, opt: any) {
    return (
      <ListItem
        {...props}
        key={opt.label}
        style={{
          display: "flex",
          justifyContent: "space-between",
          ...props.style,
        }}
      >
        <Typography variant="h5">{opt.label}</Typography>
        <Typography variant="h6">{opt.count}</Typography>
      </ListItem>
    );
  }
}
