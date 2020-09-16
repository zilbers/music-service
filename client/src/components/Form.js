import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import "./css/Form.css";
import { get, create } from "../modules/axios-module";

const types = [
  {
    value: "songs",
    label: "Song",
  },
  {
    value: "albums",
    label: "Album",
  },
  {
    value: "artists",
    label: "Artist",
  },
  {
    value: "playlists",
    label: "Playlist",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();
  const [type, setType] = useState("");
  const [artists, setArtists] = useState([]);

  const onSubmit = (data) => {
    props.handleClose();
    const saveFormat = {
      collums: Object.keys(data),
      values: Object.values(data),
    };
    create(type, saveFormat)
      .then((res) => alert(res.data))
      .catch((res) => alert(res.message));
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const getArtists = () => {
    get("artists")
      .then((data) => setArtists(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(getArtists, []);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl error={Boolean(errors.type)}>
        <InputLabel id="type-of-entrie">Type of entrie</InputLabel>
        <Select
          labelId="select-type"
          id="select-type"
          onChange={handleChange}
          value={type}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
      </FormControl>

      {type && (
        <>
          {/* Artist input */}
          {(type === "albums" || type === "songs") && (
            <>
              <FormControl error={Boolean(errors.artist)}>
                <InputLabel id="artist">artist</InputLabel>
                <Controller
                  as={
                    <Select
                      labelId="select-artist"
                      id="select-artist"
                      value={type}
                    >
                      {artists.map((option) => (
                        <MenuItem key={option.id} value={`${option.id}`}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  name="artist_id"
                  rules={{ required: "this is required" }}
                  control={control}
                  defaultValue=""
                />
                {errors.artist && (
                  <FormHelperText>{errors.artist.message}</FormHelperText>
                )}
              </FormControl>
            </>
          )}

          {/* Name input */}
          <TextField
            name={type === "songs" ? "title" : "name"}
            label={type === "songs" ? "title" : "name"}
            id={type === "songs" ? "title" : "name"}
            inputRef={register({ required: true })}
            error={Boolean(errors.name)}
          />
          {errors.name && (
            <FormHelperText error={Boolean(errors.name)}>
              this is required
            </FormHelperText>
          )}

          {/* youtube_link input */}
          {type === "songs" && (
            <>
              <TextField
                name="youtube_link"
                label="youtube link"
                id="youtube_link"
                inputRef={register}
              />
            </>
          )}

          {/* Created at input */}
          {(type === "albums" || type === "songs") && (
            <>
              <TextField
                name="Created_at"
                id="date"
                label="Created at"
                type="date"
                className={classes.textField}
                error={Boolean(errors.artist)}
                inputRef={register({ required: true })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}

          {/* Cover-img input */}
          {(type === "albums" ||
            type === "artists" ||
            type === "playlists") && (
            <>
              <TextField
                name="cover_img"
                label="cover image"
                id="cover_img"
                inputRef={register}
              />
            </>
          )}

          {/* Length input */}
          {type === "songs" && (
            <>
              <FormControl>
                <Controller
                  as={
                    <TextField
                      id="length"
                      label="length"
                      type="time"
                      className={classes.textField}
                      inputRef={register({ required: true })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 1,
                      }}
                    />
                  }
                  name="length"
                  defaultValue="00:00:00"
                  rules={{ required: "this is required" }}
                  control={control}
                />
                {errors.length && (
                  <FormHelperText error={Boolean(errors.length)}>
                    {errors.length.message}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}

          {/* Lyrics input */}
          {type === "songs" && (
            <FormControl>
              <Controller
                as={
                  <TextField
                    id="lyrics"
                    label="lyrics"
                    multiline
                    rows={6}
                    variant="outlined"
                    error={Boolean(errors.lyrics)}
                  />
                }
                name="lyrics"
                rules={{ required: "this is required" }}
                control={control}
                defaultValue=""
              />
              {errors.lyrics && (
                <FormHelperText error={Boolean(errors.lyrics)}>
                  {errors.lyrics.message}
                </FormHelperText>
              )}
            </FormControl>
          )}

          <input type="submit" />

          {type === "albums" && <></>}
        </>
      )}
    </form>
  );
}
