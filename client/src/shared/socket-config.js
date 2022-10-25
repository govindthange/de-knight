import io from 'socket.io-client';

const WEBSOCKET_PATH = `ws://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET_PORT}`;

// Ref: https://socket.io/docs/v4/client-options/

const socket = io(WEBSOCKET_PATH, {
  path: '/de-chess/multiplayer/',
  // upgrade tells the client that it should try to upgrade the
  // transport from HTTP long-polling to something better.
  upgrade: true,
  transports: [
    // w/ the 'websocket' option alone it disables
    // the HTTP long-polling transport.
    'websocket'
    // w/ 'polling' as 2nd item in array it will use WebSocket first, if available
    // 'polling'
  ],
  extraHeaders: {
    'de-chess-extra-header-comes-here': 'some-dummy-value' // This header is ignored for now!
  },
  // For enabling authentication set following value to true.
  withCredentials: false,
  protocols: ['de-chess-protocol-v1'], // This is some dummy value.

  // With autoUnref set to true, the Socket.IO client
  // client will allow the program to exit if there is
  // no other active timer/TCP socket in the event
  // system (even if the client is connected)
  autoUnref: false

  // For working w/ a certificate (say self-signed certificate)
  // ca: readFileSync("./cert.pem")

  // For working w/ client-certificate authentication
  // ca: readFileSync("./server-cert.pem"),
  // cert: readFileSync("./client-cert.pem"),
  // key: readFileSync("./client-key.pem"),
});

export default socket;
