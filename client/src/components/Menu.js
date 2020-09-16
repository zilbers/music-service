import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuComp(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/">
          <StyledMenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </StyledMenuItem>
        </Link>

        <Link to="/lists/songs">
          <StyledMenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <MusicNoteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="songs" />
          </StyledMenuItem>
        </Link>

        <Link to="/lists/albums">
          <StyledMenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <AlbumIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Albums" />
          </StyledMenuItem>
        </Link>

        <Link to="/lists/artists">
          <StyledMenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Artists" />
          </StyledMenuItem>
        </Link>

        <Link to="/lists/playlists">
          <StyledMenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <QueueMusicIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="playlists" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
