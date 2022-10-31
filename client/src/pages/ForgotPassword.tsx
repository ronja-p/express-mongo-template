import React from 'react';

const ForgotPassword = () => {
  return (
    <form
      action="http://localhost:3000/api/v1/users/forgotpassword"
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
        <button type="submit">Send reset password link</button>
      </div>
    </form>
  );
};

export default ForgotPassword;
