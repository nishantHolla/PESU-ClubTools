import ImageFrame from "../../components/ImageFrame/ImageFrame";
import "./dashboard_style.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <ImageFrame className="blank-project">Blank Project</ImageFrame>
      <ImageFrame src="certificate1.png" alt="Certificate 1" />
      <ImageFrame src="certificate2.png" alt="Certificate 2" />
      <ImageFrame src="certificate3.png" alt="Certificate 3" />
      <ImageFrame src="certificate4.png" alt="Certificate 4" />
      <ImageFrame src="certificate5.png" alt="Certificate 5" />
    </div>
  );
}

export default Dashboard;
