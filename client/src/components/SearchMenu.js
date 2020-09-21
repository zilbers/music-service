/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from "../modules/axios-module";
import './css/SearchMenu.css'

export default function FreeSolo(props) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (filter) => {
    const endpoint = "search?";

    setSearch(filter);
    if (filter.length > 0) {
      get(`${endpoint}filter=${filter}`)
        .then((data) => setData(data.data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="SearchSongs"
        disableClearable
        options={data.map((item) => item.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            color="default"
            InputProps={{ ...params.InputProps, type: "search" }}
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            className="search"
          />
        )}
      />
    </div>
  );
}
