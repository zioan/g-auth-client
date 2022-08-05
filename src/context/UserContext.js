import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import server from '../util/server';
import AuthContext from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const { user, getUser } = useContext(AuthContext);

  const login = async (email, password) => {
    setUserEmail(email);
    const loginDetails = {
      email,
      password,
    };
    try {
      const userRes = await axios.post(`${server}/users/login`, loginDetails);
      getUser();
      console.log('user loged in');
      console.log(user);
      setError('');
      setQrCode(userRes.data.qr);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const registerUser = async (email, password) => {
    setUserEmail(email);
    const registerData = {
      email,
      password,
    };
    try {
      const userRes = await axios.post(
        `${server}/users/register`,
        registerData
      );
      getUser();
      setError('');
      setQrCode(userRes.data.qr);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const updateUserEmail = async (email) => {
    const userData = { email };
    try {
      await axios.put(`${server}/users/update/email/${user.id}`, userData);
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const userData = {
      email: user.email,
      password: currentPassword,
      newPassword: newPassword,
    };
    try {
      await axios.put(`${server}/users/update/password/${user.id}`, userData);
    } catch (error) {
      console.log(error);
      setError('Your current password is incorrect');
      return;
    }
    setError('');
    logoutUser();
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${server}/users/logout`);
      getUser();
      setError('');
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  const clearUserEmail = () => {
    setUserEmail('');
  };

  return (
    <UserContext.Provider
      value={{
        login,
        logoutUser,
        registerUser,
        updateUserEmail,
        updateUserPassword,
        userEmail,
        clearUserEmail,
        qrCode,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
