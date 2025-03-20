import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Renders nested routes */}
      </div>
    </div>
  );
}
