import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Password from "../components/Password/Password";

function Home() {
  return (
    <div>
      <h1>This is the home page!</h1>
      {/* <Button>text</Button> */}
      <Input placeholder="Username" icon="user" />
      <Password />
      <Button>Click Me</Button>
    </div>
  );
}

export default Home;
