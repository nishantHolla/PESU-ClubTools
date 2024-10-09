import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      {/* <Button>text</Button> */}
      <Input placeholder="Username" icon="user" />
      <Input placeholder="Password" icon="password" />
      <Button>Click Me</Button>
    </div>
  );
}

export default Home;
