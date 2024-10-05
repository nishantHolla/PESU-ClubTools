import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../lib/session"

function Home() {
  const { user } = useSession();

  return (
    <div>
      <h1>Landing page</h1>
      <Link to={user ? `/u/${user.id}` : '/login'}>
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Home;

