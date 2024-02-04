import React, { useEffect, useState } from "react";
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
import usePrevious from "@/hooks/usePrevious";

export interface IDistinctAutoCompleteProps<T> {
  field: string;
  label: string;
  sx?: SxProps<Theme>;
  onChange: (val: string) => void;
  disabled?: boolean;
}
export default function DistinctAutoComplete<T>({
  field,
  label,
  onChange,
}: IDistinctAutoCompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [withCount, setWithCount] = useState<
    readonly { label: string; count: number }[]
  >([]);

  useEffect(() => {
    const hasOption = withCount.find((opt) => opt.label === text);
    if (!text || hasOption) return;

    setLoading(true);

    const debounce = setTimeout(async () => {
      try {
        const res = await pb.collection(`count_gen`).getList(1, 50, {
          filter: `gen >= "${text}"`,
        });

        const list = res.items.map((itm) => ({
          label: capitalize(itm.gen),
          count: itm.COUNT,
        }));

        setLoading(false);

        setWithCount(list);
      } catch (error) {
        console.error(error);

        if ((error as string).includes("autocancel")) {
          return;
        }
      }
    }, 250);

    return () => {
      setLoading;
      clearTimeout(debounce);
    };
  }, [text, withCount]);

  return (
    <Box>
      <Autocomplete
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
          onChange(val?.label || "");
        }}
        filterOptions={(opts, state) =>
          opts.filter((opt) =>
            opt?.label?.toLowerCase().startsWith(state.inputValue.toLowerCase())
          )
        }
        onInputChange={(e, val) => setText(val)}
        isOptionEqualToValue={({ label: optLabel }, { label: valLabel }) =>
          optLabel === valLabel
        }
        getOptionLabel={(opt) => capitalize(opt.label)}
        renderOption={renderOptions}
        options={withCount}
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
