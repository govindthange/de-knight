import {useEffect, useState} from 'react';
import io from 'socket.io-client';

let socket;

const WEBSOCKET_PATH = `http://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET_PORT}`;

const connect = room => {
  socket = io(WEBSOCKET_PATH);
  socket && room && socket.emit('join', room);
};

const disconnect = () => {
  console.log('Disconnecting socket...');
  socket && socket.disconnect();
};

const handleEvent = (event, handler) => {
  if (!socket) return true;
  socket.on(event, msg => {
    console.log('Websocket event received!');
    return handler(null, msg);
  });
};

function useSocket(initialRoom) {
  const [room, setRoom] = useState(initialRoom);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    if (room) connect(room);

    const onEvent = (err, data) => {
      if (err) return;
      setTranscript(oldTranscript => [data, ...oldTranscript]);
    };

    handleEvent('chat', onEvent);

    return () => {
      disconnect();
    };
  }, [room]);

  const emit = (event, obj) => {
    if (socket) socket.emit(event, {message: obj, room});
  };

  return {room, setRoom, emit, transcript};
}

export default useSocket;
