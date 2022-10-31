import React from 'react';

const Register = () => {
  return (
    <form
      action="http://localhost:3000/api/v1/users"
      method="post"
      encType="multipart/form-data"
    >
      <div>
        <input
          type="text"
          placeholder="Enter first name"
          name="firstName"
          required
        ></input>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter last name"
          name="lastName"
          required
        ></input>
      </div>
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
        <input type="file" name="profilePicture" required></input>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Register;
