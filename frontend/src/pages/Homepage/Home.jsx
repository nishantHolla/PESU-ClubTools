import Button from "../../components/Button/Button";
import "./home_style.css";
function Home() {
  return (
    <>
      <div className="hero1">
        <div className="hero1text">
          <div className="heading">
            <span>Club tools</span>
            <br></br>Certificate generator
          </div>
          <div className="buttons">
            <Button className="button1">Get Started</Button>
            <Button className="button2">Click for confetti</Button>
          </div>
        </div>
        <div className="hero1img">
          <img
            className="img1"
            src="/images/home_page1.png"
            width="400px"
            height="400px"
            alt="logo"
          />
        </div>
      </div>
      <div className="hero2">
        <div className="hero2text1">
          <div className="heading">
            Here is how you can use<br></br> CertGen
          </div>
          <div className="text2">
            News write-ups offer a great way to let clients know about new
            products and services, events , awards, and more. News write-ups
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
      <div className="footer">
        <div className="text1">We would love to hear from you </div>
        <div className="text2">Connect with us </div>
        <div className="text3">clubtoolsorg@gmail.com</div>
      </div>
    </>
  );
}

export default Home;
