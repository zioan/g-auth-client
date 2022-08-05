import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

function TestComponent() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    user && console.log(user);
  }, [user]);

  return (
    <>
      <hr />
      <h3>User is: {user ? user.email : 'Not registered'}</h3>
    </>
  );
}

export default TestComponent;
