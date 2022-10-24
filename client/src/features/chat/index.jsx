import {useState} from 'react';
/*
import useSocket from '../../hooks/useSocket';
*/
import useUpdateLogger from '../../hooks/useUpdateLogger';
import useSocketSubject from '../../hooks/useSocketSubject';

function Chat() {
  const rooms = ['A', 'B', 'C'];
  const [message, setMessage] = useState('');
  const [transcript, setTranscript] = useState([]);
  /*
  const {room, transcript, setRoom, emit, lastStatus} = useSocket(rooms[0]);
  */

  // TODO: useCallback()
  const onEvent = event => {
    console.log(`Received [CHAT] event w/ object [${JSON.stringify(event)}]`);
    setTranscript(oldTranscript => [event.data, ...oldTranscript]);
  };

  const {room, setRoom, emit, lastStatus} = useSocketSubject(rooms[0], onEvent);

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
