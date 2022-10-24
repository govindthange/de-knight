import {useEffect, useState} from 'react';
import socketObservable from '../utils/SocketSubject';

function useSocketSubject(initialRoom) {
  const [lastStatus, setLastStatus] = useState('Initializing');
  const [room, setRoom] = useState(initialRoom);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    if (room) {
      setLastStatus(`Entered room '${room}'`);
      socketObservable.enter(room);
      setLastStatus(`Entered room '${room}'`);
    }

    // TODO: useCallback()
    const onEvent = (err, obj) => {
      setLastStatus(`Received [CHAT] event w/ object [${JSON.stringify(obj)}]`);

      if (err) return;
      setTranscript(oldTranscript => [obj, ...oldTranscript]);
    };

    // TODO: useCallback()
    socketObservable.registerEvent('chat', onEvent);

    return () => {
      socketObservable.exit();
      setLastStatus(`Exited room '${room}'`);
    };
  }, [room]);

  const emit = (event, obj) => {
    socketObservable.emit(event, obj);
    setLastStatus(`Emitted ${event} event w/ ${JSON.stringify(obj)}`);
  };

  // Had we returned these values in array the client of this hook could
  // have named these variable anything w/ the array destructuring operator.
  return {room, setRoom, emit, transcript, lastStatus};
}

export default useSocketSubject;
