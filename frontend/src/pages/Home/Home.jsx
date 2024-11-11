import Button from "../../components/Button/Button";
import Hero from "../../components/Hero/Hero";
// import heroImage from "../../images/Clubtools_homepage.png";
import "./home_style.css";
import { useEffect } from "react";
import { useStatus } from "../../providers/status/Status";
import { useSession } from "../../providers/session/Session";
import { useNavigate } from "react-router-dom";
import Link from "../../components/Link/Link";
import Icon from "../../components/Icon/Icon";
import Textarea from "../../components/Textarea/Textarea";

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
          </div>
        </div>
        <div className="hero1img">
          <img className="img1" src="/images/certificate.svg" alt="" />
        </div>
      </div>

      {/* Step 1 */}
      <div className="hero2" id="home-usage">
        <div className="hero2text1">
          <h3>How to use Clubtools</h3>
          <div className="heading">
            Follow these steps to create and distribute certificates
          </div>
        </div>
      </div>

      {/* Hero for Step 1 */}
      <Hero
        title="Sign Up / Log In"
        subtitle="New Users: Sign up with Google. Returning Users: Log in with your email and password."
        image="/images/Clubtools_homepage.png"
        reverseLayout={false}
      />

      {/* Hero for Step 2 */}
      <Hero
        title="Access the Dashboard"
        subtitle="View and manage your past projects and explore certificate templates."
        image="/images/Clubtools_homepage.png"
        reverseLayout={true}
      />

      {/* Hero for Step 3 */}
      <Hero
        title="Start a New Project"
        subtitle="Select a template, upload a certificate design, and a CSV file with participant details."
        image="/images/Clubtools_homepage.png"
        reverseLayout={false}
      />

      {/* Hero for Step 4 */}
      <Hero
        title="Customize Certificate Fields"
        subtitle="Add fields like names, registration numbers, and more, then link them to your CSV columns."
        image="/images/Clubtools_homepage.png"
        reverseLayout={true}
      />

      {/* Hero for Step 5 */}
      <Hero
        title="Save Your Template"
        subtitle="Click Save once your template is set up."
        image="/images/Clubtools_homepage.png"
        reverseLayout={false}
      />

      {/* Hero for Step 6 */}
      <Hero
        title="Draft Your Email"
        subtitle="Write your email, include variables from your CSV, and save the draft."
        image="/images/Clubtools_homepage.png"
        reverseLayout={true}
      />

      {/* Hero for Step 7 */}
      <Hero
        title="Send Certificates"
        subtitle="Go to the Status tab and click Send. Track email delivery status."
        image="/images/Clubtools_homepage.png"
        reverseLayout={false}
      />

      {/* Hero for Step 8 */}
      <Hero
        title="Manage Projects and Templates"
        subtitle="Rename, delete, or edit templates, and access pre-made templates from the Clubtools Collection."
        image="/images/Clubtools_homepage.png"
        reverseLayout={true}
      />

      {/* Hero for Step 9 */}
      <Hero
        title="Account Options"
        subtitle="Log out or delete your account from the user profile dropdown."
        image="/images/Clubtools_homepage.png"
        reverseLayout={false}
      />

      <div className="hero3" id="home-about">
        <div className="hero3text1">
          <h3>About Clubtools</h3>
          <div className="heading">
            Learn more about how Clubtools can help you with certificate
            creation and distribution
          </div>
        </div>
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
