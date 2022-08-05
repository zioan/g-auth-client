import { useState, useContext } from 'react';
import axios from 'axios';
import server from '../util/server';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';

function ValidateUserSecret() {
  const [userSecret, setUserSecret] = useState('');
  const { getUser } = useContext(AuthContext);
  const { userEmail } = useContext(UserContext);

  const email = userEmail;

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email,
      userSecret,
    };

    try {
      await axios.post(`${server}/users/secret`, data).then(() => getUser());
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className='border'>
      <h4>Validation</h4>
      <form onSubmit={submitHandler}>
        <label>Validation Code</label>
        <input
          type='text'
          placeholder='Enter Validation Code'
          value={userSecret}
          onChange={(e) => setUserSecret(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default ValidateUserSecret;
