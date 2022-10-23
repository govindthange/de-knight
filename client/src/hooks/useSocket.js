import {useEffect, useState} from 'react';
import io from 'socket.io-client';

let socket;

const WEBSOCKET_PATH = `http://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET_PORT}`;

const connect = room => {
  socket = io(WEBSOCKET_PATH);
  socket && room && socket.emit('join', room);
};

const disconnect = () => {
  socket && socket.disconnect();
};

const registerEvent = (event, handler) => {
  if (!socket) return true;
  socket.on(event, msg => {
    console.log('Websocket event received!');
    return handler(null, msg);
  });
};

function useSocket(initialRoom) {
  const [lastStatus, setLastStatus] = useState('Initializing');
  const [room, setRoom] = useState(initialRoom);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    if (room) {
      setLastStatus('Connecting');
      connect(room);
      setLastStatus('Connected ' + socket);
    }

    // TODO: useCallback()
    const onEvent = (err, obj) => {
      setLastStatus(`Received [CHAT] event w/ object [${JSON.stringify(obj)}]`);

      if (err) return;
      setTranscript(oldTranscript => [obj, ...oldTranscript]);
    };

    // TODO: useCallback()
    registerEvent('chat', onEvent);

    return () => {
      disconnect();
      setLastStatus('Disconnected');
    };
  }, [room]);

  const emit = (event, obj) => {
    socket && socket.emit(event, {message: obj, room});
    setLastStatus(`Emitted ${event} event w/ ${JSON.stringify(obj)}`);
  };

  // Had we returned these values in array the client of this hook could
  // have named these variable anything w/ the array destructuring operator.
  return {room, setRoom, emit, transcript, lastStatus};
}

export default useSocket;
