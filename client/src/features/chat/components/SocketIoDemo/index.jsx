import {useCallback, useEffect, useState} from 'react';
import useSocketIo from '../../../../hooks/useSocketIo';

function SocketIoDemo() {
  const rooms = ['A', 'B', 'C'];
  const [message, setMessage] = useState('');

  const [room, setRoom] = useState(rooms[0]);
  const [transcript, setTranscript] = useState([]);

  // Get memoized callbacks.
  const listenerMap = {
    chat: useCallback((e, obj) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      setTranscript(oldTranscript => [obj, ...oldTranscript]);
    }, [])
  };

  const {isConnected, emit} = useSocketIo(listenerMap);

  useEffect(() => {
    console.count('SocketIoDemo::useEffect() calls: ');
    emit('join', room);
  }, [room]);

  const sendMessage = useCallback(text => {
    emit('chat', {room, message: text});
  }, []);

  return (
    <div>
      <h1>
        Play Room: {room} | {isConnected ? 'connected' : 'disconnected'}
      </h1>

      {rooms.map((r, i) => (
        <button onClick={() => setRoom(r)} key={i}>
          {r}
        </button>
      ))}

      <h1>Chat:</h1>

      <input type="text" name="name" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => sendMessage(message)}>Send</button>

      {transcript.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
      <br />
    </div>
  );
}

export default SocketIoDemo;
