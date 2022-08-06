import Button from "./Button";
import { useState } from "react";
import ModalLogin from "./ModalLogin";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [email, setEmail] = useState("");

  return props.JWT !== "" ? (
    <Button title="Logout" onClick={props.logout} />
  ) : (
    <>
      <form
        onSubmit={(e) => {
          props.login(username, password, e);
        }}
      >
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button title="Login" />
      </form>
      <ModalLogin
        id="register-modal"
        startPrompt="Register New Account"
        modelTitle="Register"
        body={
          <form onSubmit={(e) => {props.register(regUsername, email, regPassword, e)}}>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Username"
              value={regUsername}
              onChange={(e) => {
                setRegUsername(e.target.value);
              }}
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => {
                setRegPassword(e.target.value);
              }}
            />
            <Button title="Register" />
          </form>
        }
      />
    </>
  );
};

export default Login;
