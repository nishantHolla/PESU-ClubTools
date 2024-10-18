import Button from "../Button/Button";
import axios from "axios";

function TestBackend() {
  return <Button onClick={async () => {
    const r = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/ping`
    })
    console.log(r.data)

  }}>Test Backend</Button>;
}

export default TestBackend;
