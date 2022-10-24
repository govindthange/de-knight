import io from 'socket.io-client';

const WEBSOCKET_PATH = `ws://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET_PORT}`;
// const WEBSOCKET_PATH = `http://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET_PORT}`;

let _instance;
let _globalState = {
  color: ''
};

class SocketSubject {
  constructor() {
    if (_instance) {
      throw new Error('New SocketSubject instance cannot be created!!');
    }

    _instance = this;

    // this.subject = webSocket(WEBSOCKET_PATH);

    // this.subject.subscribe({
    //   next: msg => console.log(`SocketSubject next() called w/ ${msg}`), // Called whenever there is a message from the server.
    //   error: err => console.log(`SocketSubject error() called w/ ${err}`), // Called if at any point WebSocket API signals some kind of error.
    //   complete: () => console.log('SocketSubject complete() called.') // Called when connection is closed (for whatever reason).
    // });
  }

  connect(room) {
    const socket = io(WEBSOCKET_PATH);
    socket && room && socket.emit('join', room);
    this.setPropertyValue('socket', socket);
  }

  disconnect() {
    const socket = this.getPropertyByName('socket');
    socket && socket.disconnect();
  }

  registerEvent(event, handler) {
    const socket = this.getPropertyByName('socket');
    if (!socket) return true;
    socket.on(event, msg => {
      console.log('SocketSubject-Websocket event received!');
      return handler(null, msg);
    });
  }

  enter(room) {
    if (room) {
      this.setPropertyValue('room', room);
      console.log('SocketSubject Connecting');
      this.connect(room);
      console.log('SocketSubject Connected');
    }

    const onEvent = (err, obj) => {
      console.log(`SocketSubject received [CHAT] event w/ object [${JSON.stringify(obj)}]`);

      // if (err) return;
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);
    };

    this.registerEvent('chat', onEvent);
  }

  exit() {
    this.disconnect();
    console.log('SocketSubject disconnected');
  }

  emit(event, obj) {
    const room = this.getPropertyByName('room');
    const socket = this.getPropertyByName('socket');
    socket && socket.emit(event, {message: obj, room});
    console.log(`SocketSubject emitted ${event} event w/ ${JSON.stringify(obj)}`);
  }

  getSubject() {
    return this.subject;
  }

  getPropertyByName(propertyName) {
    return _globalState[propertyName];
  }

  setPropertyValue(propertyName, propertyValue) {
    _globalState[propertyName] = propertyValue;
  }
}

let socketSubject = Object.freeze(new SocketSubject());

export default socketSubject;
