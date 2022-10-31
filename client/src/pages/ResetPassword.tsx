import React from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { userId } = useParams();

  return (
    <form
      action="http://localhost:3000/api/v1/users/resetpassword"
      method="post"
      encType="application/x-www-form-urlencoded"
    >
      <div>
        <input
          type="password"
          placeholder="Enter new password"
          name="password"
          required
        ></input>
      </div>
      <div>
        <input type="hidden" name="userId" value={userId}></input>
      </div>
      <div>
        <button type="submit">Reset password</button>
      </div>
    </form>
  );
};

export default ResetPassword;
