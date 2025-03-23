import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Perform login logic here (e.g., API call)
    // If login is successful:
    navigate('/');
  };

  return (
    
    <div>
      <form>
  <label>
      Name:
        <input type="text" name="name" />
  </label>
        <input type="submit" value="Submit" />
</form>
    
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;
