import { GeoResult, parse } from "@/util/geocoder";
import { Box, Divider, Paper, Typography } from "@mui/material";
import LocationIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as React from "react";

export interface IGeoResultItemProps {
  geo: GeoResult;
  onClick?: () => void;
}

export function GeoResultItem({
  geo: { admin1, admin2, country, name },
  onClick,
}: IGeoResultItemProps) {
  return (
    <Paper
      onClick={onClick}
      elevation={2}
      sx={{
        cursor: onClick && "pointer",
        margin: 3,
        width: "350px",
        height: "100px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      <LocationIcon sx={{ margin: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
          borderLeft: "solid 1px gray",
          margin: 1,
          padding: 1,
        }}
      >
        <Typography variant="h6">
          {name}, {admin1}
        </Typography>
        <Typography variant="caption">
          {admin2 && admin2 + ","} {country}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "center",
          marginRight: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </Box>
    </Paper>
  );
}
