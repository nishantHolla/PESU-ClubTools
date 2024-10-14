import Button from "../../components/Button/Button";
import "./home_style.css";
import { useEffect } from "react";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useNavigate } from "react-router-dom";
import Link from "../../components/Link/Link";
import Icon from "../../components/Icon/Icon";

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
            <span>Club tools</span>
            <br></br>Certificate generator
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
          </div>
        </div>
        <div className="hero1img">
          <img
            className="img1"
            src="/images/certificate.svg"
            width="500px"
            height="500px"
            alt="logo"
          />
        </div>
      </div>
      <div className="hero2" id="home-usage">
        <div className="hero2text1">
          <div className="heading">
            Here is how you can use<br></br> CertGen
          </div>
          <div className="text2">
            News write-ups offer a great way to let clients know about new
            products and services, events, awards, and more. News write-ups
            offer a great way to let clients know about new products and
            services, events, awards, and more.
          </div>
        </div>
        <div className="hero2img1">
          <img
            className="img2"
            src="/images/home_page2.png"
            width="600px"
            height="500px"
            alt="logo"
          />
        </div>
      </div>
      <div>
        <h1 style={{ padding: 100 }} id="home-about">
          Todo: Add About section
        </h1>
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
