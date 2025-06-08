import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
      alert('Logged out successfully');
      navigate('/login');  // redirect to login or home after logout
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
