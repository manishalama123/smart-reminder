import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const {user, logout} =useAuthStore();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }
  return (
    <div className="min-h-screen bg-gray-50 ">
      <nav className="bg-white shadow px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Smart Reminder</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome,user</span>
            <Button onClick={handleLogout} variant="outline" size="sm" >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-600">Calendar and reminders coming soon ...</p>

      </main>
    </div>
  )
}
