export function Status({isConnected, loading, initResult, status}) {
  return (
    <div>
      <div>{!isConnected && <div>Connecting to remote server...</div>}</div>
      <div>{isConnected && <div>Connected to remote server.</div>}</div>
      <div>{loading && <div>'Loading...'</div>}</div>
      <div>{!loading && <div>'Loaded remote player data'</div>}</div>
      <div>Chessboard.initResult: {initResult}</div>
      <div>Chessboard.status: {status}</div>
    </div>
  );
}
