import { Paper, Box, Typography, Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import ExploreImg from "../util/images/explore.png";
import StudyImg from "../util/images/study.png";
import ListenImg from "../util/images/listen.png";

export interface ILandingPageActionButtonsProps {}

export function LandingPageActionButtons(
  props: ILandingPageActionButtonsProps
) {
  return (
    <Paper
      elevation={6}
      sx={{
        width: "33%",
        height: "275px",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingY: 4,
        paddingX: 1,
        textAlign: "center",
      }}
    >
      <Link href="/map">
        <Box>
          <Image
            style={{ width: "150px", height: "150px" }}
            src={ExploreImg}
            alt="Explore Icon"
          />
          <Typography sx={{ marginTop: 2 }} variant="h6">
            Explore
          </Typography>
        </Box>
      </Link>

      <Divider orientation="vertical" />
      <Box>
        <Image
          style={{ width: "150px", height: "150px" }}
          src={ListenImg}
          alt="Explore Icon"
        />
        <Typography variant="h6">Listen</Typography>
      </Box>
      <Divider orientation="vertical" />
      <Link href="/study">
        <Box>
          <Image
            style={{ width: "150px", height: "150px" }}
            src={StudyImg}
            alt="Explore Icon"
          />{" "}
          <Typography variant="h6">Study</Typography>
        </Box>
      </Link>
    </Paper>
  );
}
