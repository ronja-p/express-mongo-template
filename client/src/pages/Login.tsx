import React from 'react';

const Login = () => {
  return (
    <form
      action="http://localhost:3000/api/v1/users/login"
      method="post"
      encType="application/x-www-form-urlencoded"
    >
      <div>
        <input
          type="email"
          placeholder="Enter email address"
          name="email"
          required
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          required
        ></input>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div>
        <a href="http://localhost:4000/resendverification">
          Resend verification link
        </a>
      </div>
      <div>
        <a href="http://localhost:4000/forgotpassword">Forgot password</a>
      </div>
    </form>
  );
};

export default Login;
