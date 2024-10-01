import { useParams } from "react-router-dom";

function DashboardPage() {
  const params = useParams()
  return <div>This is the dashboard page of user {params.userid}</div>;
}

export default DashboardPage;
