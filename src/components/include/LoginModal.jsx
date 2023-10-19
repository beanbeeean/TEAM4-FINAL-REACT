import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LoginModal = (props) => {
  const clientId = "clientID";
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GoogleOAuthProvider>
          <GoogleLogin
            onSuccess={(res) => {
              console.log(res);
            }}
            onFailure={(err) => {
              console.log(err);
            }}
          />
        </GoogleOAuthProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
