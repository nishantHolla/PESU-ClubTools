import { useState } from "react"

function App() {
  const [serverResponse, setServerResponse] = useState('');

  const pingServer = async () => {
    const response = await fetch("http://localhost:3000/ping");
    const data = await response.json();
    setServerResponse(`Server says: ${data.message}`);
  }

  return (
    <div>
      <h1>{serverResponse}</h1>
      <button onClick={pingServer}>Ping server</button>
    </div>
  )
}

export default App
