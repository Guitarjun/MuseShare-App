import React, { useRef, useState } from "react"; //import React Component
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { database } from "..";
import { storage } from "..";

export default function LogInPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
  
    async function handleSubmit(e) {
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        // For login
        login(email, password)
        .catch(err => {
            setError("Failed to log in");
            console.log(err)}); //log any errors for debugging 
        history.push('/');
    }
  
    return (
    <div className="wrapper">
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="m-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="m-3" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className=" btn-secondary mt-3 w-100" type="submit">
                Log In
              </Button>
            </Form>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </div>
    )
  }