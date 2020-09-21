# ![Scale-Up Velocity](./readme-files/logo-main.png)   Zilbers - Music Service
In this project I created a Music Service Web Application, with React.js, Express and a MySql database.

![Log-in](./readme-files/home.gif)

## Backend
- The Express app located in the path `server/app.js` and exports the `app` object (`module.exports = app;`).
- The server runs on port `8080` serve the react app on `http://localhost:8080/` and exposes those API endpoints:
  - [GET] api/tickets - returns an array of tickets from saved in `server/data.json`. If called with query param `searchText` the API will filter only tickets that have a title including a case-insensitive version of the `searchText` param
  - [POST] api/tickets/[:ticketId]/done - Sets `done` property to `true` for the given ticketId
  - [POST] api/tickets/[:ticketId]/undone - Sets `done` property to `false` for the given ticketId
  - [POST] api/tickets - Adds new ticket to data with unique ID and cration time
  - Added logger who makes all the work with the backend much easier

## Client
- The app title is `Tickets Manager` with a custom `favicon`.
- The app loads (from backend) and shows all Tickets.
- The app has input with id `searchInput`. This input requests the server on `onChange` with relevant `searchText` param and update the list accordingly.
- The app has button to restore the hidden ticket list on click with the id `restoreHideTickets`.
- Every ticket has hide button with className `hideTicketButton` that will hide the ticket from view. And there is counter with `hideTicketsCounter` className of number of hiding tickets.
- Every ticket has `markDone` button which marks that certain ticket as done and updates server
- The app has add ticket button which validates the input and sends it to the backend

![validation](./readme-files/ticket-validate.gif)


## Deployment
- The app is deployed on glitch:
https://zilber-ticket-manager.glitch.me/