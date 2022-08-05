import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, qrCode } = useContext(UserContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='border'>
      {qrCode && <img src={qrCode} alt='code' />}
      <h4>Login</h4>
      <form onSubmit={loginHandler}>
        <div>
          {/* Email field */}
          <div>
            <label>Email</label>
            <input
              type='email'
              placeholder='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password field */}
          <div>
            <label>Password</label>
            <input
              type='password'
              placeholder='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className=' text-red-400'>{error}</p>}

          {/* Login button */}
          <div>
            <button type='submit'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
