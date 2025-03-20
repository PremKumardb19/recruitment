import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear any local/session storage if used (optional)
    localStorage.removeItem('user');
    // ✅ Navigate back to login
    navigate('/');
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <Link to="/dashboard/application-form" className="mb-4 hover:bg-gray-700 p-2 rounded">
        Application Form
      </Link>

      <Link to="/dashboard/application-status" className="mb-4 hover:bg-gray-700 p-2 rounded">
        Application Status
      </Link>

      {/* ✅ Logout Button */}
      <button 
        onClick={handleLogout} 
        className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
}
