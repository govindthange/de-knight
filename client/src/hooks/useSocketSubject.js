import {useEffect, useState} from 'react';
import socketObservable from '../utils/SocketSubject';

function useSocketSubject(initialRoom, eventHandler) {
  const [lastStatus, setLastStatus] = useState('Initializing');
  const [room, setRoom] = useState(initialRoom);

  useEffect(() => {
    if (room) {
      setLastStatus(`Entered room '${room}'`);
      socketObservable.enter(room);
      setLastStatus(`Entered room '${room}'`);
    }

    let subscription = null;
    if (eventHandler) {
      // TODO: useCallback()
      subscription = socketObservable.getSubject().subscribe({
        next: eventHandler
      });
    }

    return () => {
      subscription && subscription.unsubscribe();
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
  return {room, setRoom, emit, lastStatus};
}

export default useSocketSubject;
