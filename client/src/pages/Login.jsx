import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json();
    if(data.user){
      localStorage.setItem('token', data.user);
      alert('Login successful');
      window.location.href = '/quote';
    }
    else{
      alert('Check username and password');
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br />
        <input type="submit" value="login"/>
      </form>
    </div>
  )
}

export default Login