import {useCallback, useEffect, useState} from 'react';
import useSocketIo from '../../../../hooks/useSocketIo';

function SocketIoDemo() {
  const rooms = ['A', 'B', 'C'];
  const [message, setMessage] = useState('');

  const [room, setRoom] = useState(rooms[0]);
  const [transcript, setTranscript] = useState([]);
  const [move, setMove] = useState('');
  const [positions, setPositions] = useState([]);

  // Get memoized callbacks.
  const listenerMap = {
    chat: useCallback((e, obj) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      setTranscript(oldTranscript => [obj, ...oldTranscript]);
    }, []),

    play: useCallback((e, move) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(move)} data`);
      setPositions(oldPositions => [move, ...oldPositions]);
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

  const playMove = useCallback(m => {
    emit('play', {room, move: m});
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

      <h1>Player Moves:</h1>

      <input type="text" name="move" value={move} onChange={e => setMove(e.target.value)} />
      <button onClick={() => playMove(move)}>Play</button>
      {positions.map((d, i) => (
        <p key={i}>{d}</p>
      ))}
    </div>
  );
}

export default SocketIoDemo;
