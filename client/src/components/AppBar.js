import React, { useContext, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { get } from '../modules/axios-module';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import SearchResults from './SearchResults';
import useSearch from './useSearch';
import '../CSS/AppBar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const context = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const endpoint = 'search?';

  const { results, loading, error } = useSearch(search);

  // const handleChange = async (filter) => {
  //   // setSearch(filter);
  //   if (filter.length > 0) {
  //     // const { loading, error, results } = await useSearch(filter);
  //     // setData(results)
  //     get(`${endpoint}filter=${filter}`)
  //       .then((data) => setData(data.data))
  //       .catch((err) => console.log(err));
  //   }
  // };
  const logout = () => {
    context.logUserOut();
    localStorage.removeItem('token');
  };

  // useEffect(() => {
  //   if (search === '') {
  //     setSearch('');
  //     setData([]);
  //   }
  // }, [search]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <Typography variant="h6" className={classes.title}>
            Music - Service
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
            />
          </div>
          <SearchResults
            data={results}
            setData={setData}
            setSearch={setSearch}
          />
          <Typography variant="h6" className={classes.title}>
            Hi, {context.email.split('@')[0]}
          </Typography>
          <Link to="/" className="links">
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
