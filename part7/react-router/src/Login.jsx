import { useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import { TextField, Button } from "@mui/material";
import { Button, Input } from "./components/Button";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(event.target.username.value);
    navigate("/");
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input label = "username" name = "username"/>
        </div>
        <div>
          <Button variant="contained" color = "primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;