"use client";
import { NextPage } from "next";
import SimpleSearch from "../components/SimpleSearch";

const SearchPage: NextPage = () => {
  const searchByOptions = [
    { key: "gen", label: "Genus" },
    { key: "sp", label: "Species" },
    { key: "en", label: "Common Name" },
    { key: "loc", label: "Location" },
  ];

  return (
    <div>
      <SimpleSearch
        onSelect={(key, val) => console.log("onSelect", key, val)}
        searchByOptions={searchByOptions}
      />
    </div>
  );
};

export default SearchPage;
