import {useCallback, useEffect, useState} from 'react';
import socketObservable from '../utils/SocketSubject';

function useSocketSubject(initialRoom, forEvent, eventHandler) {
  const [lastStatus, setLastStatus] = useState('Initializing');
  const [room, setRoom] = useState(initialRoom);

  // Get memoized callbacks.
  const enterRoom = useCallback(() => socketObservable.enter(room, forEvent), [room, forEvent]);
  const subscribeForEvent = useCallback(() => eventHandler, [eventHandler]);
  const exitRoom = useCallback(() => socketObservable.exit(), []);

  useEffect(() => {
    console.log('Setting up socket in useEffect()');
    if (room) {
      setLastStatus(`Entered room '${room}'`);
      enterRoom();
      setLastStatus(`Entered room '${room}'`);
    }

    let subscription = null;
    if (eventHandler) {
      subscription = socketObservable.getSubject().subscribe({
        next: subscribeForEvent()
      });
    }

    return () => {
      subscription && subscription.unsubscribe();
      exitRoom();
      setLastStatus(`Exited room '${room}'`);
    };
  }, [room, enterRoom, exitRoom, forEvent, eventHandler]);

  const emit = (event, obj) => {
    socketObservable.emit(event, obj);
    setLastStatus(`Emitted ${event} event w/ ${JSON.stringify(obj)}`);
  };

  // Had we returned these values in array the client of this hook could
  // have named these variable anything w/ the array destructuring operator.
  return {room, setRoom, emit, lastStatus};
}

export default useSocketSubject;
