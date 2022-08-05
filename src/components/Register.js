import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState('');

  const { registerUser, error, qrCode } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  const registerUserHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setShowError('Password do not match!');
      setInterval(() => {
        setShowError('');
      }, 4000);
      return;
    } else {
      setShowError('');
    }

    // register new user
    try {
      await registerUser(email, password);
    } catch (err) {
      console.log(err);
    }

    // After user successfuly register
    if (user) {
      console.log('registered');
    }
  };

  return (
    <div className='border'>
      {qrCode && <img src={qrCode} alt='code' />}

      <h4>Register</h4>
      <form onSubmit={registerUserHandler}>
        <div>
          <div>
            {/* Email field */}
            <div>
              <label>
                <span>Email</span>
              </label>
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
              <label>
                <span>Password</span>
              </label>
              <input
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm password field */}
            <div>
              <label>
                <span>Confirm Password</span>
              </label>
              <input
                type='password'
                placeholder='Confirm password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Display errors if email already registered */}
            {/* Handled by UserContext */}
            {error && <p>{error}</p>}

            {/* Display errors for form filds requirements and validation */}
            {showError && <p>{showError}</p>}

            <div>
              <button type='submit'>Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
