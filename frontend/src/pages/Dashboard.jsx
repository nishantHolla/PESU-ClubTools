import { useSession } from "../providers/session/Session";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

function Dashboard() {
  const { logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      return navigate('/');
    })
  }

  return (
    <div>
      <h1>This is the dashboard page</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Dashboard;
