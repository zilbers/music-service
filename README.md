# ![Scale-Up Velocity](./readme-files/logo-main.png)   Zilbers - Music Service
In this project I created a Music Service Web Application, with React.js, Express and a MySql database.

![Log-in](./readme-files/log-in.gif)

## Database
- The app is using MySql database.
- It has 10 tables which holds that about the users registerd, songs, playlists and albums.
![Log-in](./readme-files/data-diagram.png)

## Backend
- The Express app located in the path `server/app.js` and exports the `app` object (`module.exports = app;`).
- The server runs on port `3001` serve the react app on `http://localhost:8080/` and exposes those API endpoints:
  - [GET] Can get data about songs, albums, playlists and users from the database.
  - [POST] Can upload new songs / albums / artists / playlists.
  - [PUT]  Can update entries.

![add-song](./readme-files/add-song.gif)

## Client
- The app title is `Music Service`.
- The app loads (from the backend) and shows all of the songs, playlists and albums that are saved in the data base.
- The app has a menu to navigate.
- The app has input field. This input requests the server on `onChange` with relevant `searchText` param and shows songs that fits with the search text.
![search](./readme-files/home.gif)
- The app has many different pages with data on every song, album and artist.
- Every song has `favorite` button which updates the server and saves it as liked by the logged in user.

![favorite](./readme-files/like.gif)
