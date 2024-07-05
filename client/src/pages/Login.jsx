import React from 'react'
//import "./Login.css"

const Login = () => {
  const loginwithgoogle = ()=>{
    window.open("http://localhost:8000/auth/google","_self")
}
  return (
    <section>
    <div class="form-box">
      <div class="form-value">
        <h2>Login</h2>
        <h3>Lovin The Vibe</h3>
        <div class="google-login" onClick={loginwithgoogle}>
          <center><a><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Login with Google" /></a></center>
        </div>
        <div class="register">
          <p>Continue with Google</p>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Login