import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json();
    if(data.status === "ok"){
      navigate('/login');
    }
  }

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="text" placeholder='Fullname' value={name} onChange={(e) => setName(e.target.value)}/>
        <br />
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br />
        <input type="submit" value="Register"/>
      </form>
    </div>
  )
}

export default Register