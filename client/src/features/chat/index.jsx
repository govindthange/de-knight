import {useState} from 'react';
import useSocket from '../../hooks/useSocket';

function Chat() {
  const rooms = ['A', 'B', 'C'];
  const [message, setMessage] = useState('');
  const {room, transcript, setRoom, emit} = useSocket(rooms[0]);

  return (
    <div>
      <h1>Room: {room}</h1>

      {rooms.map((r, i) => (
        <button onClick={() => setRoom(r)} key={i}>
          {r}
        </button>
      ))}

      <h1>Live Chat:</h1>

      <input type="text" name="name" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => emit('chat', message)}>Send</button>

      {transcript.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
}

export default Chat;
