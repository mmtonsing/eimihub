import axios from '../../api/axios';

export default function LogoutButton() {
  const handleLogout = async () => {
    await axios.post('/logout', {}, { withCredentials: true });
    alert('Logged out');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
