import React from 'react';

const ResendVerification = () => {
  return (
    <form
      action="http://localhost:3000/api/v1/users/resendverification"
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
        <button type="submit">Resend Verification Email</button>
      </div>
    </form>
  );
};

export default ResendVerification;
