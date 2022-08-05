import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import TestComponent from './components/TestComponent';
import ValidateUserSecret from './components/ValidateUserSecret';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Login />
      <Register />
      <ValidateUserSecret />
      <TestComponent />
      <Logout />
    </div>
  );
}

export default App;
