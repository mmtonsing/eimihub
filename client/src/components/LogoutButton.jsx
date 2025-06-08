import axios from '../api/axios';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      alert('Logged out');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
