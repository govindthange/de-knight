import {useState, useEffect, useCallback} from 'react';
import socket from '../shared/socket-config';

function useSocketIo(listnerMap) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onConnectMemoizedCallback = useCallback(() => {
    setIsConnected(true);
    console.log('websocket has connected!');
  }, []);

  const onDisconnectMemoizedCallback = useCallback(() => {
    setIsConnected(false);
    console.log('websocket has disconnected!');
  }, []);

  const memoizedListnerMap = {
    chat: useCallback(obj => {
      console.log(`websocket has received message ${JSON.stringify(obj)}`);
      listnerMap['chat']('chat', obj);
    }, []),
    game: useCallback(obj => {
      console.log(`websocket has received message ${JSON.stringify(obj)}`);
      listnerMap['game']('game', obj);
    }, []),
    play: useCallback(obj => {
      console.log(`websocket has received message ${JSON.stringify(obj)}`);
      listnerMap['play']('play', obj);
    }, [])
  };

  useEffect(() => {
    console.count('useSocketIo::useEffect() calls: ');

    socket.on('connect', onConnectMemoizedCallback);
    socket.on('disconnect', onDisconnectMemoizedCallback);
    socket.on('chat', memoizedListnerMap['chat']);
    socket.on('game', memoizedListnerMap['game']);
    socket.on('play', memoizedListnerMap['play']);

    return () => {
      console.log('clearing all websocket listeners!');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
      socket.off('game');
      socket.off('play');
    };
  }, []);

  const emit = (event, obj) => {
    socket.emit(event, obj);
    console.log(`websocket emitted ${event} w/ ${JSON.stringify(obj)}`);
  };

  return {isConnected, emit};
}

export default useSocketIo;
