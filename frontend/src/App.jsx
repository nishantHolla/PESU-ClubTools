import { useState } from "react"

function App() {
  const [serverResponse, setServerResponse] = useState('Once button is clicked this line should change');

  const pingServer = async () => {
    const response = await fetch("http://localhost:3000/ping");
    const data = await response.json();

    if (response.status === 200) {
      setServerResponse(`Server says: ${data.message}`);
    }
  }

  return (
    <div>
      <h1>{serverResponse}</h1>
      <button onClick={pingServer}>Ping server</button>
    </div>
  )
}

export default App
