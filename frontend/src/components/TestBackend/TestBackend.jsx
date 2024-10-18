import Button from "../Button/Button";
import axios from "axios";
import { testDb } from "../../lib/db";

function TestBackend() {
  return <Button onClick={testDb}>Test Backend</Button>;
}

export default TestBackend;
