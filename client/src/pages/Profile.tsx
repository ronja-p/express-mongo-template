import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${userId}`).then((res) =>
      console.log(res.body)
    );
  }, [userId]);

  return (
    <>
      <h1>User Profile</h1>
      <a href="http://localhost:3000/api/v1/users/logout">Logout</a>
    </>
  );
};

export default Profile;
