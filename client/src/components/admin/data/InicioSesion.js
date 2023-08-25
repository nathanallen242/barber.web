import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };

  const login = () => {
    if (password !== "" || username !== "") {
      history.push("/");
    }
  };

  return (
    <div className="div-bg-login">
      <div className="panel-cont-bg">
        <Card body className="card-admin-log">
          <h2 className="text-center">Inicia Sesión</h2>
          <Form className="form-login">
            <Form.Group>
              <Form.Label>
                {" "}
                <span className="requeried">*</span> Usuario
              </Form.Label>
              <Form.Control
                className="inputlog"
                type="user"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <span className="requeried">*</span> Contraseña
              </Form.Label>
              <div className="div-flex">
                <Form.Control
                  className="inputlog input-pass"
                  type={passwordShow ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {passwordShow ? (
                  <BsFillEyeFill
                    className="icon-pass"
                    onClick={togglePasswordVisiblity}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    className="icon-pass"
                    onClick={togglePasswordVisiblity}
                  />
                )}
              </div>
            </Form.Group>
            <div className="div-btn">
              <Button className="btnlog" variant="primary" onClick={login}>
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}