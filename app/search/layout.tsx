import React from "react";
import { ListItem, Typography } from "@mui/material";
import { capitalize } from "lodash";

async function getDate() {
  const list = await fetch(
    "http://127.0.0.1:8090/api/collections/distinct_gen/records?per_page=40"
  );

  const items = await list.json();
  const opts = items.map((itm: any) => ({
    label: capitalize(itm.gen),
    count: itm.COUNT,
  }));

  return opts.map((opt: { label: string; count: number }) => (
    <ListItem
      key={opt.label}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">{opt.label}</Typography>
      <Typography variant="h6">{opt.count}</Typography>
    </ListItem>
  ));
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* <Search /> */}

      {children}
    </div>
  );
};

export default Layout;
