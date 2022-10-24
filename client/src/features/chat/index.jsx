import {useState} from 'react';
/*
import useSocket from '../../hooks/useSocket';
*/
import useUpdateLogger from '../../hooks/useUpdateLogger';
import useSocketSubject from '../../hooks/useSocketSubject';

function Chat() {
  const rooms = ['A', 'B', 'C'];
  const [message, setMessage] = useState('');
  /*
  const {room, transcript, setRoom, emit, lastStatus} = useSocket(rooms[0]);
  */
  const {room, transcript, setRoom, emit, lastStatus} = useSocketSubject(rooms[0]);

  useUpdateLogger(lastStatus);

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
