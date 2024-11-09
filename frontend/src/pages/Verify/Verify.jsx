import "./verify_style.css";
import { BACKEND_URL } from "../../lib/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Result({ result }) {

  if (result) {
    return <div className="verification-result-container">
      <p> This certificate was generated by us </p>
      <p>Name: {result.name}</p>
      <p>Generated at: {new Date(result.createdAt).toLocaleString()}</p>{" "}
    </div>;
  } else {
    return <div className="verification-result-container">
      <p>This certificate was not generated by us</p>
    </div>;
  }
}

function Verify() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  const handleVerification = async () => {
    if (!params.certificateid) {
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/verify/${params.certificateid}`,
      );
      if (response.status === 200) {
        setResult(response.data.result);
      }
    } catch (_) {}
    setIsLoading(false);
  };

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div className="verification-container">
      {isLoading ? "Loading..." : <Result result={result} />}
    </div>
  );
}

export default Verify;
