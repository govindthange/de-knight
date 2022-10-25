import {useState, useEffect, useCallback} from 'react';
import socket from '../shared/socket-config';

function useSocketIo(eventName, eventHandler) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onConnectMemoizedCallback = useCallback(() => {
    setIsConnected(true);
    console.log('websocket has connected!');
  }, []);

  const onDisconnectMemoizedCallback = useCallback(() => {
    setIsConnected(false);
    console.log('websocket has disconnected!');
  }, []);

  const onEventMemoizedCallback = useCallback(obj => {
    console.log(`websocket has received message ${JSON.stringify(obj)}`);
    eventHandler(eventName, obj);
  }, []);

  useEffect(() => {
    console.count('useSocketIo::useEffect() calls: ');

    socket.on('connect', onConnectMemoizedCallback);
    socket.on('disconnect', onDisconnectMemoizedCallback);
    socket.on(eventName, onEventMemoizedCallback);

    return () => {
      console.log('clearing all websocket listeners!');
      socket.off('connect');
      socket.off('disconnect');
      socket.off(eventName);
    };
  }, []);

  const emit = (event, obj) => {
    socket.emit(event, obj);
    console.log(`websocket emitted ${event} w/ ${JSON.stringify(obj)}`);
  };

  return {isConnected, emit};
}

export default useSocketIo;
