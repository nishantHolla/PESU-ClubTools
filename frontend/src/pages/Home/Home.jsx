import "./home_style.css";
import { useEffect } from "react";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useNavigate } from "react-router-dom";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";
import TestBackend from "../../components/TestBackend/TestBackend";

function Home() {
  const { setStatus } = useStatus();
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(null, null);
  }, []);

  return (
    <div className="home-container">
      <div className="hero1">
        <div className="hero1text">
          <div className="heading">
            <span className="title">Clubtools</span>
            <span className="subtitle">Certificate Generator</span>
          </div>
          <div className="buttons">
            <Button
              className="button1"
              onClick={() => {
                navigate(user ? `/u/${user.uid}` : "/signup");
              }}
            >
              Get Started
            </Button>
            <TestBackend />
          </div>
        </div>
        <div className="hero1img">
          <img className="img1" src="/images/certificate.svg" alt="logo" />
        </div>
      </div>
      <div className="hero2" id="home-usage">
        <div className="hero2text1">
          <h3>How to use</h3>
          <div className="heading">
            Here is how you can use Clubtools for all your certificate needs
          </div>
          <div className="text2">TODO: Add content</div>
        </div>
      </div>
      <div id="home-about" className="hero3">
        <h3>About</h3>
        <p>Todo: Add About section</p>
      </div>
      <div className="footer" id="home-contact-us">
        <div className="text1">We would love to hear from you </div>
        <div className="text2">connect with us</div>
        <Link to="mailto:clubtoolsorg@gmail.com" target="_blank">
          <div className="text3">clubtoolsorg@gmail.com</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
