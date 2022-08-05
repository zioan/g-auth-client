import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Logout() {
  const { logoutUser, clearUserEmail } = useContext(UserContext);

  const logoutHandler = () => {
    logoutUser();
    clearUserEmail();
  };

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}

export default Logout;
