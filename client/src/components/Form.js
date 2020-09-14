import React, { useState } from "react";
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

  const onSubmit = (data) => {
    props.handleClose();
    console.log(data);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

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
          <TextField
            name="name"
            label="name"
            id="name"
            inputRef={register({ required: true })}
            error={Boolean(errors.name)}
          />
          {errors.name && (
            <FormHelperText>{errors.name.message}</FormHelperText>
          )}

          {(type === "albums" || type === "songs") && (
            <>
              <TextField
                name="artist"
                label="artist"
                id="artist"
                inputRef={register({ required: true })}
                error={Boolean(errors.artist)}
              />
              {errors.name && (
                <FormHelperText>{errors.name.message}</FormHelperText>
              )}
            </>
          )}

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

          {type === "albums" && (
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

          {type === "albums" && (
            <>
              <TextField
                name="cover_img"
                label="cover_img"
                id="cover_img"
                inputRef={register}
              />
            </>
          )}

          {type === "songs" && (
            <>
              <TextField
                id="length"
                label="length"
                type="time"
                defaultValue="00:00"
                className={classes.textField}
                inputRef={register({ required: true })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1,
                }}
              />
            </>
          )}

          {type === "songs" && (
            <TextField
              id="lyrics"
              label="lyrics"
              multiline
              rows={6}
              inputRef={register}
              defaultValue=""
              variant="outlined"
            />
          )}

          <input type="submit" />

          {type === "albums" && <></>}
        </>
      )}
    </form>
  );
}
